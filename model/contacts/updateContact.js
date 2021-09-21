const fs = require('fs/promises');
const path = require('path');
const listContacts = require('./listContacts');

const contactsPath = path.join(__dirname, '../../', 'db', 'contacts.json');

const updateContact = async (contactId, data) => {
  try {
    const contactList = await listContacts();
    const contactIdx = contactList.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (contactIdx === -1) {
      return null;
    }
    const updatedContact = { ...contactList[contactIdx], ...data };
    contactList[contactIdx] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = updateContact;
