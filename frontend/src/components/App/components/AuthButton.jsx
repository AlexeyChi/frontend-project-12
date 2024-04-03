import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../hooks';
import routes from '../../../routes';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return auth.loggedIn
    ? <Button className="mr-4" as={Link} to={routes.app.loginPage()} onClick={auth.logOut}>{t('navBar.logoutBtn')}</Button>
    : null;
};

export default AuthButton;
