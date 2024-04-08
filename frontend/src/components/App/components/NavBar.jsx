import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AuthButton from './AuthButton';
import routes from '../../../routes';

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.app.mainPage()}>{t('navBar.HexletChat')}</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default NavBar;
