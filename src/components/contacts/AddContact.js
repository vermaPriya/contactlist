import React, { Fragment, useState, useContext } from 'react';
import { isEmail, isEmpty, isPhone } from '../utils/validation';
import AlertContext from '../../context/alert/alertContext';
import ContactContext from '../../context/contacts/contactContext';

const AddContact = ({ history }) => {
  const contactContext = useContext(ContactContext);
  const { addContact } = contactContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    errors: {},
  });
  const { name, email, phone, errors } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const copyErrors = {};

    // Name
    if (isEmpty(name)) {
      copyErrors.name = {
        param: 'name',
        msg: 'Name is required',
      };
    } else {
      delete copyErrors.name;
    }

    // Email
    if (!isEmail(email)) {
      copyErrors.email = {
        param: 'email',
        msg: 'Email is not valid',
      };
    } else {
      delete copyErrors.email;
    }

    // Phone
    if (isPhone(phone)) {
      copyErrors.phone = {
        param: 'phone',
        msg: 'Invalid phone number, length should be equal to 10',
      };
    } else {
      delete copyErrors.phone;
    }

    setContact({ ...contact, errors: copyErrors });

    if (Object.keys(copyErrors).length === 0) {
      const userId = JSON.parse(localStorage.getItem('contact-token'));
      addContact({ name, email, phone, userId });

      // Clear state
      setContact({
        name: '',
        email: '',
        phone: '',
        errors: {},
      });
      setAlert('Contact has been created', 'success');
      history.push('/contacts');
    }
  };

  return (
    <Fragment>
      <h1 className="my-5 text-center">
        Add <span className="text-purple">Contact</span>
      </h1>

      <form className="w-50 mx-auto" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name && 'is-invalid'}`}
            placeholder="Name"
            onChange={onChange}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.msg}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            placeholder="Email"
            onChange={onChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.msg}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            className={`form-control ${errors.phone && 'is-invalid'}`}
            placeholder="Phone"
            onChange={onChange}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.msg}</div>
          )}
        </div>
        <button className="btn btn-purple btn-block mt-4">Add Contact</button>
      </form>
    </Fragment>
  );
};

export default AddContact;
