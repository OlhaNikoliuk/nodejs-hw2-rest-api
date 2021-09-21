const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    const findContact = contactList.find(
      (contact) => contact.id.toString() === contactId
    );
    if (!findContact) {
      return null;
    }
    return findContact;
  } catch (error) {
    throw error;
  }
};

module.exports = getContactById;
