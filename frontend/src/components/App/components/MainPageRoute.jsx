import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../../hooks';
import routes from '../../../routes';

const MainPageRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  console.log(loggedIn);
  const location = useLocation();

  return loggedIn
    ? children : <Navigate to={routes.app.loginPage()} state={{ from: location }} />;
};

export default MainPageRoute;
