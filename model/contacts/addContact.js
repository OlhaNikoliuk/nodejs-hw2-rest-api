const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
const listContacts = require('./listContacts');

const contactsPath = path.join(__dirname, '../../', 'db', 'contacts.json');

const addContact = async ({ name, email, phone }) => {
  try {
    const contactList = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contactList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return newContact;
  } catch (error) {
    throw error;
  }
};

module.exports = addContact;
