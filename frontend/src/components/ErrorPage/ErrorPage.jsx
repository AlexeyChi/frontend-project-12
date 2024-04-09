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
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <div className="d-flex align-items-center justify-content-center">
              <Card.Img className="max-w-250" src={img} alt={t('errorPage.pageNotFound')} />
            </div>
          </Card.Body>
          <div className="card-footer p-4">
            <div className="text-center">
              <h1 className="h4 text-muted">{t('errorPage.pageNotFound')}</h1>
              <p className="text-muted">
                {t('errorPage.navigateTo')}
                {' '}
                <Link to={routes.app.mainPage()}>{t('errorPage.mainPage')}</Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default ErrorPage;
