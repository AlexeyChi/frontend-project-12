import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
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
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(true);

      try {
        f.setSubmitting(true);
        setAuthFailed(false);
        const res = await axios.post(routes.api.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        // setTimeout(() => navigate(routes.app.mainPage()), 1000); // <-- mb make a spiner later
        navigate(routes.app.mainPage());
      } catch (err) {
        f.setSubmitting(true);
        setAuthFailed(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        }
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
              <h1 className="text-center mb-4">Войти</h1>
              <FloatingLabel
                controlId="username"
                label="Ваш ник"
                className="mb-3"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  ref={inputRef}
                  name="username"
                  type="text"
                  placeholder="Ваш ник"
                  autoComplete="username"
                  onChange={f.handleChange}
                  value={f.values.username}
                  isInvalid={authFailed}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label="Пароль"
                className="mb-4"
              >
                <Form.Control
                  disabled={f.isSubmitting}
                  name="password"
                  type="password"
                  placeholder="password"
                  autoComplete="username"
                  onChange={f.handleChange}
                  value={f.values.password}
                  isInvalid={authFailed}
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  the username or password is incorrect
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                variant="outline-primary"
                type="submit"
                className="w-100 mb-3 btn"
                disabled={f.isSubmitting}
              >
                Войти
              </Button>
            </Form>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default LoginPage;
