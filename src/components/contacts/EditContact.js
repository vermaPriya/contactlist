import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { isEmail, isEmpty, isPhone } from '../utils/validation';
import { Spinner } from 'reactstrap';

import ContactContext from '../../context/contacts/contactContext';
import AlertContext from '../../context/alert/alertContext';

const EditContact = ({ match, history }) => {
  const contactContext = useContext(ContactContext);
  const { setCurrent, current, updateContact, clearCurrent } = contactContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const nameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCurrent(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (!current) {
    return (
      <div className="box-spinner">
        <Spinner className="spinner" style={spinnerStyle} />
      </div>
    );
  }

  const { id, name, email, phone } = current;

  const onSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
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

    setErrors(copyErrors);

    if (Object.keys(copyErrors).length === 0) {
      const userId = JSON.parse(localStorage.getItem('contact-token'));

      const body = { id, userId, name, email, phone };
      updateContact(body);

      // Clear inputs
      nameRef.current.value = '';
      emailRef.current.value = '';
      phoneRef.current.value = '';
      setErrors({});
      clearCurrent();

      setAlert('Contact has been updated', 'success');
      history.push('/contacts');
    }
  };

  return (
    <Fragment>
      <h1 className="my-5 text-center">
        Edit <span className="text-purple">Contact</span>
      </h1>

      <form className="w-50 mx-auto" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name && 'is-invalid'}`}
            placeholder="Name"
            defaultValue={name}
            ref={nameRef}
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
            defaultValue={email}
            ref={emailRef}
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
            defaultValue={phone}
            ref={phoneRef}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.msg}</div>
          )}
        </div>
        <button className="btn btn-purple btn-block mt-4">
          Update Contact
        </button>
      </form>
    </Fragment>
  );
};

const spinnerStyle = { width: '2rem', height: '2rem', borderWidth: '3px' };

export default EditContact;
