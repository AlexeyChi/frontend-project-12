import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import PageTemplate from '../PageTemplate/PageTemplate';
import routes from '../../routes';
import img from '../../assets/pageNotFound.jpg';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate>
      <div className="d-flex justify-content-center align-content-center">
        <Card className="shadow-sm align-items-center max-w-500">
          <Card.Body className="row p-5">
            <Card.Img variant="top" src={img} alt="Error 404: Page not found" />
            <div className="card-footer p-4">
              <div className="text-center">
                {t('errorPage.pageNotFound')}
                {' '}
                <Link to={routes.app.mainPage()}>{t('errorPage.mainPage')}</Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default ErrorPage;
