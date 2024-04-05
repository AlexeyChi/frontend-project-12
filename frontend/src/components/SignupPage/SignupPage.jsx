import * as yup from 'yup';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Card,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';

import { useAuth } from '../../hooks';
import PageTemplate from '../PageTemplate/PageTemplate';
import img from '../../assets/signup_avatar.jpg';
import routes from '../../routes';

const SignupPage = () => {
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const validationSchema = yup.object({
    username: yup.string()
      .trim()
      .min(3, 'errors.inValidLength')
      .max(20, 'errors.inValidLength')
      .required('errors.required'),
    password: yup.string()
      .min(6, 'errors.shortPassword')
      .required('errors.required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'errors.mustMatch')
      .required('errors.required'),
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async ({ username, password }) => {
      setRegistrationStatus(false);
      const newUser = { username, password };
      try {
        const response = await axios.post(routes.api.singupPath(), newUser);
        localStorage.setItem('userId', JSON.stringify(response.data));
        setRegistrationStatus(true);
        auth.logIn();
        navigate(routes.app.mainPage());
        toast.success(`${t('signup.hello')}, ${username}!`);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationStatus(true);
          inputEl.current.select();
          return;
        }
        if (!err.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        toast.error(t('errors.network'));
      }
    },
  });

  return (
    <PageTemplate>
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Card.Img src={img} className="max-w-250 rounded-circle" alt={t('signup.header')} />
            </div>
            <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={f.handleSubmit}>
              <h1 className="text-center mb-4">{t('signup.header')}</h1>
              <FloatingLabel
                controlId="username"
                label={t('signup.username')}
                className="mb-3"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  ref={inputEl}
                  name="username"
                  type="text"
                  placeholder={t('signup.username')}
                  autoComplete="username"
                  onChange={f.handleChange}
                  onBlur={f.handleBlur}
                  value={f.values.username}
                  isInvalid={
                    (f.touched.username && f.errors.username) || registrationStatus
                  }
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {t(f.errors.username)}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="password"
                label={t('signup.password')}
                className="mb-3"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  name="password"
                  type="password"
                  placeholder={t('signup.password')}
                  autoComplete="password"
                  onChange={f.handleChange}
                  onBlur={f.handleBlur}
                  value={f.values.password}
                  isInvalid={
                    (f.touched.password && f.errors.password) || registrationStatus
                  }
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {t(f.errors.password)}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="confirmPassword"
                label={t('signup.confirmPassword')}
                className="mb-4"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  name="confirmPassword"
                  type="password"
                  placeholder={t('signup.confirmPassword')}
                  autoComplete="confirmPassword"
                  onChange={f.handleChange}
                  onBlur={f.handleBlur}
                  value={f.values.confirmPassword}
                  isInvalid={
                    (f.touched.confirmPassword && f.errors.confirmPassword) || registrationStatus
                  }
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {registrationStatus
                    ? t('errors.userAlreadyExist')
                    : t(f.errors.confirmPassword)}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                disabled={f.isSubmitting}
                variant="outline-primary"
                type="submit"
                className="w-100 mb-4 btn"
              >
                {t('signup.signupBtn')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default SignupPage;
