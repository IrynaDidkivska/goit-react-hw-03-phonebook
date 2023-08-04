import { toast } from 'react-toastify';
import React from 'react';
import { ContactList } from './ContactsList/ContactList';
import { ContactForm } from './ContactsForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Title, Wrapper } from './App.styled';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(window.localStorage.getItem('contact'));
    if (contacts && contacts.length) {
      this.setState({ contacts });
    }
  }
  componentDidUpdate(prevProp, prevState) {
    if (prevState.length !== this.state.contacts.length) {
      window.localStorage.setItem(
        'contact',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  //Додаємо новий контакт
  addNewContact = newContact => {
    const { contacts } = this.state;
    const checkContact = contacts.find(
      contact => contact.name === newContact.name
    );
    checkContact
      ? toast.warning(`${newContact.name} is already in contact`)
      : this.setState(prev => ({
          contacts: [...prev.contacts, newContact],
        }));
  };
  //вводимо в інтуп фільтра
  hendleFilterInput = value => {
    this.setState({ filter: value });
  };
  //фільтруємо
  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  //видаляємо
  hendleDeleteContact = (id, name) => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
    toast.success(`Контакт ${name} успішно видалено!`);
  };
  render() {
    const { filter } = this.state;
    const filteredContact = this.getFilteredContact(filter);
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm newContact={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterInput={this.hendleFilterInput} />
        <ContactList
          contacts={filteredContact}
          onDelete={this.hendleDeleteContact}
        />
      </Wrapper>
    );
  }
}
