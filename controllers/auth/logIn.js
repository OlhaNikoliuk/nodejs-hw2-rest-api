const { User } = require('../../models');
const { NotFound, BadRequest } = require('http-errors');

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, '_id email password');

  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong');
  }

  const token = user.createToken();

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: 'succes',
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = logIn;
