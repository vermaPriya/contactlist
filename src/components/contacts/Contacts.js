import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { Spinner } from 'reactstrap';

import ContactItem from './ContactItem';
import FIlterContacts from './FIlterContacts';
import Alert from '../layout/Alert';
import ContactContext from '../../context/contacts/contactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { getContacts, contacts, filtered } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Alert />
      <Link to="/contacts/add" className="btn btn-purple float-right mb-4">
        <MdAdd /> Add Contact
      </Link>
      <FIlterContacts />

      {contacts !== null ? (
        contacts.length > 0 ? (
          filtered ? (
            filtered.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))
          ) : (
            contacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))
          )
        ) : (
          <div className="card">
            <div className="card-body">No Contacts to display</div>
          </div>
        )
      ) : (
        <div className="box-spinner">
          <Spinner className="spinner" style={spinnerStyle} />
        </div>
      )}
    </Fragment>
  );
};

const spinnerStyle = { width: '2rem', height: '2rem', borderWidth: '3px' };

export default Contacts;
