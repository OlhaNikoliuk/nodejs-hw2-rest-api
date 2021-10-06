const express = require('express');
const router = express.Router();

const { contactsController } = require('../../controllers/');
const { authenticate } = require('../../middlewares');

router.get('/', authenticate, contactsController.listContacts);

router.get('/:contactId', authenticate, contactsController.getContactById);

router.post('/', authenticate, contactsController.addContact);

router.delete('/:contactId', authenticate, contactsController.removeContact);

router.put('/:contactId', authenticate, contactsController.updateContact);

router.patch(
  '/:contactId/favorite',
  authenticate,
  contactsController.updateFavorite
);

module.exports = router;
