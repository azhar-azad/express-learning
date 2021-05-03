const redis = require('redis');
const moment = require('moment');
const rateLimit = require('express-rate-limit');
const config = require('../config/config');
const { sendData, sendError } = require('../controllers/messageController');

const redisClient = redis.createClient();

const WINDOW_SIZE_IN_HOURS = config.REQ_WINDOW_SIZE; // 10 second window as defined in .env file
const MAX_WINDOW_REQUEST_COUNT = config.MAX_REQ_IN_A_WINDOW; // 10 requests pre window
const WINDOW_LOG_INTERVAL_IN_HOURS = 1; 

const customRedisRateLimitter = (req, res, next) => {
    
    try {
        // check that redis client exists
        if (!redisClient) {
            throw new Error('Redis client does not exist!');
            process.exit(1);
        }

        // fetch records of current user using IP address, returns null when no record is found
        redisClient.get(req.ip, function(err, record) {
            if (err) {
                throw err;
            }

            const currentRequestTime = moment();

            console.log(record);

            // if no record is found, create a new record for user and store to redis
            if (record == null) {
                let newRecord = [];
                let requestLog = {
                    requestTimeStamp: currentRequestTime.unix(),
                    requestCount: 1
                };
                newRecord.push(requestLog);
                redisClient.set(req.ip, JSON.stringify(newRecord));
                next();
            }

            // if record is found, parse it's value and calculate number of requests users has made within the last window
            let data = JSON.parse(record);

            let windowStartTimestamp = moment().subtract(WINDOW_SIZE_IN_HOURS, 'hours').unix();
            let requestWithinWindow = data.filter(entry => {
                return entry.requestTimeStamp > windowStartTimestamp
            });
            console.log('requestWithinWindow', requestWithinWindow);

            let totalWindowRequestsCount = requestWithinWindow.reduce((accumulator, entry) => {
                return accumulator + entry.requestCount
            }, 0);

            // if number of request made is greater than or equal to the desired maximum, return error
            if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
                sendError(res, 429, `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS * 3600} seconds limit!`);
            }
            else {
                // if number of requests made is lesser than allowed maximum, log new entry
                let lastRequestLog = data[data.length - 1];
                let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime.subtract(WINDOW_SIZE_IN_HOURS, 'hours').unix();

                // if interval has not passed since last request log, increment counter
                if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
                    lastRequestLog.requestCount++;
                    data[data.length - 1] = lastRequestLog;
                }
                else {
                    // if interval has passed, log new entry for current user and timestamp
                    data.push({
                        requestTimeStamp: currentRequestTime.unix(),
                        requestCount: 1
                    });
                }

                redisClient.set(req.ip, JSON.stringify(data));
                next();
            }
        });

    } catch (error) {
        next(error);
    }
};

const customRedisRateLimiter = rateLimit({
    windowMs: WINDOW_SIZE_IN_HOURS * 60 * 60 * 1000,
    max: MAX_WINDOW_REQUEST_COUNT,
    message: `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS * 3600} seconds limit!`,
    headers: true
});

module.exports = {
    customRedisRateLimiter
};