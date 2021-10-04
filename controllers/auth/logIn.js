const { User } = require('../../models');
const { NotFound, BadRequest } = require('http-errors');

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, '_id email password');
  if (!user) {
    throw new NotFound(`Email ${email} not found`);
  }
  if (!user.comparePassword(password)) {
    throw new BadRequest('Invallid password');
  }

  const token = '123456789';
  res.json({
    status: 'succes',
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = logIn;
