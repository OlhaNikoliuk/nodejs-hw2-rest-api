const { User } = require('../../models');
const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');

const logOut = async (req, res, next) => {
  console.log(req.user);
};

module.exports = logOut;
