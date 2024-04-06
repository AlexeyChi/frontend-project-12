import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../../hooks';
import routes from '../../../routes';

const MainPageRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return loggedIn?.token
    ? children : <Navigate to={routes.app.loginPage()} state={{ from: location }} />;
};

export default MainPageRoute;
