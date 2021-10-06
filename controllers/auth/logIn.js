const { User } = require('../../models');
const { BadRequest } = require('http-errors');
const { sendSuccessRes } = require('../../utils');

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, '_id email password');

  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong');
  }

  const token = user.createToken();

  const leggedInUser = await User.findByIdAndUpdate(user._id, { token });

  sendSuccessRes(res, { user: leggedInUser, message: 'Success signin' });
};

module.exports = logIn;
