import { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ListContacts from './ListContacts';
import Filter from './Filter';
import useLocalStorage from '../hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const deleteContacts = contactId => {
    setContacts(contacts.filter(c => c.id !== contactId));

    console.log(contacts);
  };

  const forSubmitHandler = ({ name, number }) => {
    const nameContact = contacts.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    if (nameContact) {
      alert(`${name} is already in contact`);
      return;
    }

    setContacts([
      {
        id: nanoid(),
        name,
        number,
      },
      ...contacts,
    ]);

    console.log(contacts);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContact = contacts.filter(f =>
    f.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <section className="section">
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={forSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ListContacts
          contacts={visibleContact}
          onDeleteContact={deleteContacts}
        />
      </div>
    </section>
  );
};
