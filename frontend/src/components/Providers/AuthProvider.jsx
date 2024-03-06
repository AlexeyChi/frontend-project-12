import { useState, useMemo, useCallback } from 'react';

import AuthContext from '../../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getAuthHeaders = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    return userId
      ? { Authorization: `Bearer ${userId.token}` }
      : {};
  }, []);

  const handlerAuth = useMemo(() => ({
    loggedIn, logIn, logOut, getAuthHeaders,
  }), [loggedIn, getAuthHeaders]);

  return (
    <AuthContext.Provider value={handlerAuth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
