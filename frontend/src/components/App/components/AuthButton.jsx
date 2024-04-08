import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../hooks';

const AuthButton = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return loggedIn?.token
    ? <Button type="button" onClick={logOut}>{t('navBar.logoutBtn')}</Button>
    : null;
};

export default AuthButton;
