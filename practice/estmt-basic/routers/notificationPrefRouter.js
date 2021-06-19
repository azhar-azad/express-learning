/**
 * @Path: /notificationPreferences
 * @Description:
 * */
const notificationPrefRouter = require('express').Router();
const {
  createNotificationPreference,
  getNotificationPreferences,
  getNotificationPreference,
  updateNotificationPreference,
  deleteNotificationPreference
} = require('../controllers/notificationPrefController');

/**
 * @URL: http://localhost:5000/api/{version}/notificationPreferences
 * @Description: Create a new NotificationPreference entity
 * @Method: POST
 * */
notificationPrefRouter.post('/', createNotificationPreference);

/**
 * @URL: http://localhost:5000/api/{version}/notificationPreferences
 * @Description: Get all NotificationPreference entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: usrs, accts, ufas, emails, smss, acctNums, usr(y/n), acct(y/n), ufa(y/n)
 * */
notificationPrefRouter.get('/', getNotificationPreferences);

/**
 * @URL: http://localhost:5000/api/{version}/notificationPreferences/{notificationPrefId}
 * @Description: Get a NotificationPreference entity by id
 * @Method: GET
 * */
notificationPrefRouter.get('/:id', getNotificationPreference);

/**
 * @URL: http://localhost:5000/api/{version}/notificationPreferences/{notificationPrefId}
 * @Description: Update a NotificationPreference entity by id
 * @Method: PUT
 * */
notificationPrefRouter.put('/:id', updateNotificationPreference);

/**
 * @URL: http://localhost:5000/api/{version}/notificationPreferences/{notificationPrefId}
 * @Description: Delete a NotificationPreference entity by id
 * @Method: DELETE
 * */
notificationPrefRouter.delete('/:id', deleteNotificationPreference);

module.exports = notificationPrefRouter;