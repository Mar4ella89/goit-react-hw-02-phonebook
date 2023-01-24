import React from 'react';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={css.contactList}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={css.contactItem}>
        <span className={css.contactName}>{name}</span>{' '}
        <span className={css.contactNumber}>{number}</span>
        <button
          className={css.contactBtnClose}
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;
