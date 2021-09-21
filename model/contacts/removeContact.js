const fs = require('fs/promises');
const path = require('path');
const listContacts = require('./listContacts');

const contactsPath = path.join(__dirname, '../contacts.json');

const removeContact = async (contactId) => {
  try {
    const contactList = await listContacts();
    const contactIdx =  contactList.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (contactIdx === -1) {
      return null;
    }
    const updatedContacts = contactList.filter((contact) => contact.id.toString() !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return 'Succes remove';
  } catch (error) {
    throw error;
  }
};

module.exports = removeContact;