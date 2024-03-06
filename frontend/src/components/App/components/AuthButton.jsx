import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../../../hooks';
import routes from '../../../routes';

const AuthButton = () => {
  const auth = useAuth();

  return auth.loggedIn
    ? <Button className="mr-4" as={Link} to={routes.app.loginPage()} onClick={auth.logOut}>Log out</Button>
    : null;
};

export default AuthButton;
