import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

const Rename = () => {
  const dispatch = useDispatch();

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.select();
  }, []);
  const f = useFormik({
    initialValues: {
      name: '', // <-- find actual channel name
    },
    onSubmit: () => {},
  });

  return (
    <Modal>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>
            Переименовать канал
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
                onChange={f.handleChange}
                value={f.values.name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Отменить</Button>
          <Button variant="primary">Отправить</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default Rename;
