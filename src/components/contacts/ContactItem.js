import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import ContactContext from '../../context/contacts/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact } = contactContext;

  const { id, name, email, phone } = contact;

  return (
    <div className="card my-4">
      <div className="card-body">
        <div className="contact-wrap">
          <div className="contact">
            <h3>{name}</h3>
            <div>
              <FaPhone className="mb-1 mr-1 text-purple" /> <span>{phone}</span>
            </div>
            <div>
              <IoMdMail className="mr-1 text-purple" /> <span>{email}</span>
            </div>
          </div>

          <div className="action">
            <Link to={`/contacts/edit/${id}`}>
              <MdEdit size={20} className="text-muted" />
            </Link>
            <Link to="/#">
              <MdDelete
                size={20}
                className="text-danger"
                onClick={() => deleteContact(id)}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
