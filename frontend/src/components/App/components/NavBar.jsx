import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AuthButton from './AuthButton';
import ChangeLngButton from './ChangeLngButton';
import routes from '../../../routes';

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.app.mainPage()}>{t('navBar.HexletChat')}</Navbar.Brand>
        <div className="d-flex">
          <ChangeLngButton />
          <AuthButton />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
