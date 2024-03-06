import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

import AuthButton from './AuthButton';
import routes from '../../../routes';

const NavBar = () => (
  <Navbar className="mb-4 shadow-sm navbar-expand-lg navbar-light bg-white">
    <Container>
      <Navbar.Brand as={Link} to={routes.app.mainPage()}>Hexlet Chat</Navbar.Brand>
      <AuthButton />
    </Container>
  </Navbar>
);

export default NavBar;
