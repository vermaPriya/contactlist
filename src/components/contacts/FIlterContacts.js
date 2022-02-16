import React, { useContext, useRef } from 'react';
import ContactContext from '../../context/contacts/contactContext';

const FIlterContacts = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter } = contactContext;

  const text = useRef('');

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className="form-group">
      <input
        type="text"
        name="filter"
        placeholder="Search"
        className="form-control"
        ref={text}
        onChange={onChange}
      />
    </div>
  );
};

export default FIlterContacts;
