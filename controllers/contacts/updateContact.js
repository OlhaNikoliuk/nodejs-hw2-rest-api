const { Contact } = require('../../models');
const { joiContactSchema } = require('../../models/contact');

const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!(name || email || phone)) {
      const error = new Error(`Missing fields`);
      error.status = 400;
      throw error;
    }
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      const error = new Error(`Contact with id = ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result: updatedContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
