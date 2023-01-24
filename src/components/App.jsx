import { nanoid } from 'nanoid'
import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = ({name, number}) => {

    const contact = {
      id: nanoid(),
      name,
      number,
    }

    this.setState(prevstate => ({
      contacts: [contact, ...prevstate.contacts]
    }));
  };

  render() {
    const { contacts } = this.state;
    return (
      <>
         <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </div>
        <div>
          <h2>Contacts</h2>
          <ContactList
            contacts={contacts}
            onDeleteContact={this.deleteContact}
            
          />
        </div>
      </>
    );
  }
}
