const { User } = require('../../models');
const { Conflict } = require('http-errors');
const { sendSuccessRes } = require('../../utils');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  sendSuccessRes(res, { user: newUser, message: 'Success signup' }, 201);
};

module.exports = register;
