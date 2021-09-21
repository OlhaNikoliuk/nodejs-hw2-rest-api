const express = require('express');
const router = express.Router();
const contactsJoinSchema = require('../../schemas');
const contactsOperations = require('../../model/contacts/index');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
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
});

router.post('/', async (req, res, next) => {
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
});

router.delete('/:contactId', async (req, res, next) => {
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
      message: 'Contact deleted'
    });
    
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {name, email, phone} = req.body
    if(!name || email || phone){
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
    const updatedContact = await contactsOperations.updateContact(contactId, req.body);
    
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
});

module.exports = router;
