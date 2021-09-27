const { Contact } = require('../../models');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const contact = await Contact.findOne( { _id: contactId },   '_id name email phone favorite'   );
    const contact = await Contact.findById( contactId, '_id name email phone favorite');
    if (!contact) {
      const error = new Error(`Contact with id = ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
