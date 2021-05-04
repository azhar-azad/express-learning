const { Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

const UserModel = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
  const user = new UserModel(userData);
  return user.save();
};