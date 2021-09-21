const contactsOperations = require('../../model/contacts');
const contactsJoinSchema = require('../../schemas');

const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!(name || email || phone)) {
      const error = new Error(`Missing fields`);
      error.status = 400;
      throw error;
    }
    const { error } = contactsJoinSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const { contactId } = req.params;
    const updatedContact = await contactsOperations.updateContact(
      contactId,
      req.body
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
