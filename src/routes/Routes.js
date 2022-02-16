import React, { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Spinner } from 'reactstrap';

import Login from '../components/pages/Login';
import Navbar from '../components/layout/Navbar';
import Contacts from '../components/contacts/Contacts';
import AddContact from '../components/contacts/AddContact';
import EditContact from '../components/contacts/EditContact';
import NotFount from '../components/pages/NotFound';

import AuthContext from '../context/auth/authContext';

const Routes = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  if (loading) {
    return (
      <div className="home-spinner">
        <Spinner
          style={{ width: '3rem', height: '3rem' }}
          className="spinner"
        />
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <div className="container pt-5">
        {isAuthenticated ? (
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/contacts" />} />
            <Route
              exact
              path="/login"
              render={() => <Redirect to="/contacts" />}
            />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/contacts/add" component={AddContact} />
            <Route exact path="/contacts/edit/:id" component={EditContact} />
            <Route component={NotFount} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              exact
              path="/contacts"
              render={() => <Redirect to="/login" />}
            />
            <Route exact path="/login" component={Login} />
            <Route component={NotFount} />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default Routes;
