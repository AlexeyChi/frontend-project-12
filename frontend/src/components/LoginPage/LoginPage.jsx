import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import {
  Card,
  Button,
  Form,
  FloatingLabel,
} from 'react-bootstrap';

import { useAuth } from '../../hooks/index.jsx';
import PageTemplate from '../PageTemplate/PageTemplate.jsx';
import routes from '../../routes/index.js';
import img from '../../assets/Todo_login.jpg';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const auth = useAuth();
  const rollbar = useRollbar();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.api.loginPath(), values);
        auth.logIn(response.data);
        navigate(routes.app.mainPage());
      } catch (err) {
        rollbar.error('something wrong', err);
        f.setSubmitting(false);
        if (!err.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        if (err.code === 'ERR_NETWORK') {
          toast.error(t('errors.network'));
          return;
        }
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        }
      }
    },
  });

  return (
    <PageTemplate>
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Card.Img src={img} className="max-w-250 rounded-circle" alt={t('login.header')} />
            </div>
            <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={f.handleSubmit}>
              <h1 className="text-center mb-4">{t('login.header')}</h1>
              <FloatingLabel
                controlId="username"
                label={t('login.username')}
                className="mb-3"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  ref={inputRef}
                  name="username"
                  type="text"
                  placeholder={t('login.username')}
                  autoComplete="username"
                  onChange={f.handleChange}
                  value={f.values.username}
                  isInvalid={authFailed}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label={t('login.password')}
                className="mb-4"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  name="password"
                  type="password"
                  placeholder={t('login.password')}
                  autoComplete="username"
                  onChange={f.handleChange}
                  value={f.values.password}
                  isInvalid={authFailed}
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {t('errors.authFailed')}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                variant="outline-primary"
                type="submit"
                className="w-100 mb-3 btn"
                disabled={f.isSubmitting}
              >
                {t('login.loginBtn')}
              </Button>
            </Form>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.newUser')}</span>
                {' '}
                <Link to={routes.app.signupPage()}>{t('login.signupLink')}</Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default LoginPage;
