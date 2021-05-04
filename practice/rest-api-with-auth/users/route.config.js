const UsersController = require('./controllers/users.controller');

exports.routesConfig = (app) => {
  app.post('/users', [
    UsersController.insert
  ]);
};
