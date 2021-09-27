const { Contact } = require('../../models');
const { joiUpdateFavorite } = require('../../models/contact');

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = joiUpdateFavorite.validate(req.body);
    if (error) {
      const err = new Error('Missing field favorite');
      err.status = 400;
      throw err;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
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

module.exports = updateFavorite;
