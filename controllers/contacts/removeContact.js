const contactsOperations = require('../../model/contacts');
const contactsJoinSchema = require('../../schemas');

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsOperations.removeContact(contactId);
    if (!deletedContact) {
      const error = new Error(`Contact with id = ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
