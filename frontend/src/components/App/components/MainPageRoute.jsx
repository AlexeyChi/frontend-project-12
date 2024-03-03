import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../../../hooks';
import routes from '../../../routes';

const TokenProvider = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn
    ? children : <Navigate to={routes.app.loginPage()} state={{ from: location }} />;
};

export default TokenProvider;
