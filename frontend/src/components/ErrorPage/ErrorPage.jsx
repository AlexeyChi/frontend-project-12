import { Card } from 'react-bootstrap';
import img from '../../assets/pageNotFound.jpg';

const ErrorPage = () => (
  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Card className="shadow-sm" style={{ width: '500px', height: '500px' }}>
      <Card.Img variant="top" src={img} alt="Error 404: Page not found" />
    </Card>
  </div>
);

export default ErrorPage;
