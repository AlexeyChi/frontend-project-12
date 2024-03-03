import { Card } from 'react-bootstrap';
import PageTemplate from '../PageTemplate/PageTemplate';
import img from '../../assets/pageNotFound.jpg';

const ErrorPage = () => (
  <PageTemplate>
    <div className="d-flex justify-content-center align-content-center">
      <Card className="shadow-sm align-items-center max-w-500">
        <Card.Body className="row p-5">
          <Card.Img variant="top" src={img} alt="Error 404: Page not found" />
        </Card.Body>
      </Card>
    </div>
  </PageTemplate>
);

export default ErrorPage;
