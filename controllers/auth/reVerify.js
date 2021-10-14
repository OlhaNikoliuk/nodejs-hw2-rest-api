const { User } = require('../../models/user');
const { sendEmail, sendSuccessRes } = require('../../utils');
const { BadRequest } = require('http-errors');

const reVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest('Missing required field email');
  }

  const user = await User.findOne({ email });

  const { verify, verifyToken } = user;

  if (verify || !verifyToken) {
    throw new BadRequest('Verification has already been passed');
  }
  const data = {
    to: email,
    subject: 'Sending with SendGrid is Fun',
    html: `<strong> Welcome! </strong><p> <a href='http://localhost:3000/api/users/verify/${verifyToken}' target="blalnk">Let's confirm your email address</a></p>`,
  };
  await sendEmail(data);

  sendSuccessRes(res, { message: 'Verification email sent' }, 200);
};

module.exports = reVerify;
