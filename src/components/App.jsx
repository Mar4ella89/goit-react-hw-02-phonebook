import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevstate => {
      if (prevstate.name === contact.name) {
        return alert(`${contact.name} is already in contacts`);
      }
      
      ({
        contacts: [contact, ...prevstate.contacts],
      });
    });
  };

  changeFilter = event => this.setState({ filter: event.currentTarget.value });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <div className={css.container}>
          <div>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={this.addContact} />
          </div>
          <div>
            <h2>Contacts</h2>

            <Filter value={filter} onChange={this.changeFilter} />

            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </div>
        </div>
      </>
    );
  }
}
