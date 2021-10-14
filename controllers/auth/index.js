const signUp = require('./signUp');
const logIn = require('./logIn');
const logOut = require('./logOut');
const getCurrentUser = require('./getCurrentUser');
const addAvatar = require('./addAvatar');
const verify = require('./verify');

module.exports = {
  signUp,
  verify,
  logIn,
  logOut,
  getCurrentUser,
  addAvatar,
};
