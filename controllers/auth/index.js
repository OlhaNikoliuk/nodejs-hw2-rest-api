const signUp = require('./signUp');
const logIn = require('./logIn');
const logOut = require('./logOut');
const getCurrentUser = require('./getCurrentUser');
const addAvatar = require('./addAvatar');
const verify = require('./verify');
const reVerify = require('./reVerify');

module.exports = {
  signUp,
  verify,
  reVerify,
  logIn,
  logOut,
  getCurrentUser,
  addAvatar,
};
