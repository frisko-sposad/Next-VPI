import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';

const Contacts = () => {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setContacts(data);
      console.log(contacts, data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div>
        <div className="mb-10">Contact list:</div>
        <div className="mb-10">Contact list:</div>

        <ul>
          {contacts &&
            contacts.map(({ id, name, email }) => (
              <li key={id}>
                <strong>{name}</strong>({email})
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Contacts;
