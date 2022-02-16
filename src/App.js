import React from 'react';
import Routes from './routes/Routes';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ContactState from './context/contacts/ContactState';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Routes />
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
