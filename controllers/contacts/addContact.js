const contactsOperations = require('../../model/contacts');
const contactsJoinSchema = require('../../schemas');

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = contactsJoinSchema.validate({ name, email, phone });
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const newContact = await contactsOperations.addContact({
      name,
      email,
      phone,
    });

    res.status(201).json({
      status: 'success',
      code: 201,
      result: newContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
