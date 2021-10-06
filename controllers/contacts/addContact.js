const { Contact } = require('../../models');
const { joiContactSchema } = require('../../models/contact');

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = joiContactSchema.validate({ name, email, phone });
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const newContact = await Contact.create({
      ...req.body,
      owner: req.user._id,
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
