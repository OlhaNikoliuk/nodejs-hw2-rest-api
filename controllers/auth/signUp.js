const { User } = require('../../models');
const { Conflict } = require('http-errors');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  res.json({
    status: 'created',
    code: 201,
    message: 'Secces signup',
    response: {
      user: newUser,
    },
  });
};

module.exports = register;
