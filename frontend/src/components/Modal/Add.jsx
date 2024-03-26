import yup from 'yup';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

const Add = () => {
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <Modal>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>
            Добавить канал
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={f.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Control
                ref={inputEl}
                type="text"
                name="name"
                id="name"
                placeholder="Введите название канала..."
                onChange={f.handleChange}
                value={f.values.name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Отменить</Button>
          <Button variant="primary">Добавить</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default Add;
