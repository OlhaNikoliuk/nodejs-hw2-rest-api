const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const { sendSuccessRes } = require('../../utils');

const logOut = async (req, res, next) => {
  const { _id } = req.user;

  if (!_id) {
    throw new Unauthorized('Not authorized');
  }
  await User.findByIdAndUpdate(_id, { token: null });

  sendSuccessRes(res, { message: 'Success logout' });
};

module.exports = logOut;
