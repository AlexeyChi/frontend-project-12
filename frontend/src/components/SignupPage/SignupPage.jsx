import * as yup from 'yup';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
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
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const validationSchema = yup.object({
    username: yup.string()
      .trim()
      .min(3)
      .max(20)
      .required('Required'),
    password: yup.string().min(6).required('Required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
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
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationStatus(true);
          inputEl.current.select();
        }
        console.log(err);
        throw err;
      }
    },
  });

  return (
    <PageTemplate>
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Card.Img src={img} className="max-w-250 rounded-circle" alt="Войти" />
            </div>
            <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={f.handleSubmit}>
              <h1 className="text-center mb-4">Регистрация</h1>
              <FloatingLabel
                controlId="username"
                label="Ваш ник"
                className="mb-3"
              >
                <Form.Control
                  ref={inputEl}
                  disabled={f.isSubmitting}
                  name="username"
                  type="text"
                  placeholder="Ваш ник"
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
                  {f.errors.username}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="password"
                label="Пароль"
                className="mb-3"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  name="password"
                  type="password"
                  placeholder="password"
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
                  {f.errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="confirmPassword"
                label="Потвердите пароль"
                className="mb-4"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  name="confirmPassword"
                  type="password"
                  placeholder="confirmPassword"
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
                    ? 'This user must already exist'
                    : f.errors.confirmPassword}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                disabled={f.isSubmitting}
                variant="outline-primary"
                type="submit"
                className="w-100 mb-4 btn"
              >
                Зарегистрироваться
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default SignupPage;
