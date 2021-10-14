const { Conflict } = require('http-errors');
const { nanoid } = require('nanoid');
const gravatar = require('gravatar');
const { User } = require('../../models');
const { sendSuccessRes, sendEmail } = require('../../utils');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const avatar = gravatar.url(email, { protocol: 'https', s: 250 });
  const verifyToken = nanoid();
  const newUser = new User({
    email,
    avatarURL: avatar,
    verifyToken,
  });

  newUser.setPassword(password);
  await newUser.save();

  const data = {
    to: email,
    subject: 'Sending with SendGrid is Fun',
    html: `<strong> Welcome! </strong><p> <a href='http://localhost:3000/api/users/verify/${verifyToken}' target="blalnk">Let's confirm your email address</a></p>`,
  };
  await sendEmail(data);

  sendSuccessRes(res, { user: newUser, message: 'Success signup' }, 201);
};

module.exports = register;
