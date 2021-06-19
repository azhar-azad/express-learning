/**
 * @Path: /notificationHistories
 * @Description:
 * */
const notificationHistoryRouter = require('express').Router();
const {
  createNotificationHistory,
  getNotificationHistories,
  getNotificationHistory,
  updateNotificationHistory,
  deleteNotificationHistory
} = require('../controllers/notificationHistoryController');

/**
 * @URL: http://localhost:5000/api/{version}/notificationHistories
 * @Description: Create a new NotificationHistory entity
 * @Method: POST
 * */
notificationHistoryRouter.post('/', createNotificationHistory);

/**
 * @URL: http://localhost:5000/api/{version}/notificationHistories
 * @Description: Get all NotificationHistory entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: usrs, accts, ufas, acctNums, usr(y/n), acct(y/n), ufa(y/n), np(y/n)
 * */
notificationHistoryRouter.get('/', getNotificationHistories);

/**
 * @URL: http://localhost:5000/api/{version}/notificationHistories/{notificationHistoryId}
 * @Description: Get a NotificationHistory entity by id
 * @Method: GET
 * */
notificationHistoryRouter.get('/:id', getNotificationHistory);

/**
 * @URL: http://localhost:5000/api/{version}/notificationHistories/{notificationHistoryId}
 * @Description: Update a NotificationHistory entity by id
 * @Method: PUT
 * */
notificationHistoryRouter.put('/:id', updateNotificationHistory);

/**
 * @URL: http://localhost:5000/api/{version}/notificationHistories/{notificationHistoryId}
 * @Description: Delete a NotificationHistory entity by id
 * @Method: DELETE
 * */
notificationHistoryRouter.delete('/:id', deleteNotificationHistory);

module.exports = notificationHistoryRouter;