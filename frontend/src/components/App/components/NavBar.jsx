import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AuthButton from './AuthButton';
import routes from '../../../routes';

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="mb-4 shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.app.mainPage()}>{t('navBar.HexletChat')}</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default NavBar;
