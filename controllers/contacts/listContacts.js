const { Contact } = require('../../models');

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, '_id name email phone favorite');
    res.json({
      status: 'success',
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
