import { useState, useMemo, useCallback } from 'react';

import { AuthContext } from '../../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const authInfo = JSON.parse(localStorage.getItem('userId')) || { username: null, token: null };
  const [loggedIn, setLoggedIn] = useState(authInfo);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn({ username: data.username, token: data.token });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn({ username: null, token: null });
  };

  const getAuthHeaders = useCallback(() => {
    const { token } = loggedIn;

    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  }, [loggedIn]);

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
