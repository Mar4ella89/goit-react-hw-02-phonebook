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

  isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const { items } = this.state;
    const contactData = items.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(contactData);
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return alert(`${name} or ${number} is already in contacts`);
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevstate => ({
      contacts: [contact, ...prevstate.contacts],
    }));
  };

  

  changeFilter = event => this.setState({ filter: event.currentTarget.value });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
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
