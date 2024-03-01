import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Card,
  Button,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import PageTemplate from '../PageTemplate/PageTemplate.jsx';
import img from '../../assets/Todo_login.jpeg';

const LoginPage = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <PageTemplate>
      <Card className="shadow-sm">
        <Card.Body className="row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <Card.Img src={img} className="rounded-circle" alt="Войти" />
          </div>
          <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={f.handleSubmit}>
            <h1 className="text-center mb-4">Войти</h1>
            <FloatingLabel
              controlId="floatingInput"
              label="Ваш ник"
              className="mb-3"
            >
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder="Ваш ник"
                onChange={f.handleChange}
                value={f.name}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Пароль"
              className="mb-4"
            >
              <Form.Control
                ref={inputRef}
                type="password"
                placeholder="Пароль"
                onChange={f.handleChange}
                value={f.password}
              />
            </FloatingLabel>
            <Button variant="outline-primary" type="submit" className="w-100 mb-3 btn">Войти</Button>
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
    </PageTemplate>
  );
};

export default LoginPage;
