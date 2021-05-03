const dotenvConfig = require('dotenv').config();

// dotenvConfig();

const loadEnvVariable = (envName) => {
    const env = process.env[envName];
    if (env == null) {
        throw new Error(`Environment variable => ${envName} is undefined`);
    }
    return env;
};

const config = {
    PARKING_LOT_SIZE: loadEnvVariable('PARKING_LOT_SIZE'),
    PORT: loadEnvVariable('PORT'),
    DB_NAME:loadEnvVariable('DB_NAME'),
    SLOT_ID:loadEnvVariable('SLOT_NUMBER_PREFIX'),
    REQ_WINDOW_SIZE: loadEnvVariable('WINDOW_SIZE_IN_HOURS'),
    MAX_REQ_IN_A_WINDOW: loadEnvVariable('MAX_WINDOW_REQUEST_COUNT')
};

module.exports = config;
