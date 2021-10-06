const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../utils');

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id }, 'email subscription');

  sendSuccessRes(res, result);
};

module.exports = getCurrentUser;
