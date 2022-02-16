import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { GiHamburgerMenu } from 'react-icons/gi';

import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-nav">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Contact List
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#contactNav"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiHamburgerMenu className="text-white" />
        </button>

        <Collapse isOpen={isOpen} navbar>
          {user && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/#" className="nav-link">
                  Hi, <strong>{user.firstName}</strong>
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/#" className="nav-link" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </Collapse>
      </div>
    </nav>
  );
};

export default Navbar;
