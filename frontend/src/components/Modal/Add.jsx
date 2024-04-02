import * as yup from 'yup';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

import { selectChannels, actions as channelsActions } from '../../slices/channelsSlice';
import { actions as uiActions } from '../../slices/ui';
import routes from '../../routes';

const nameValidationSchema = (channels) => yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'Must be 3 characters or more')
    .max(20, 'Must be 20 characters or less')
    .required('Required')
    .notOneOf(channels, 'Not unique name'),
});

const Add = ({ hideModal }) => {
  const dispatch = useDispatch();
  const channelsNames = useSelector(selectChannels).map(({ name }) => name);
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: nameValidationSchema(channelsNames),
    onSubmit: async (values) => {
      try {
        nameValidationSchema(channelsNames).validateSync(values);
        const { token } = JSON.parse(localStorage.getItem('userId'));
        const { data } = await axios.post(routes.api.channelsPath(), values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(channelsActions.addChannel(data));
        dispatch(uiActions.setCurrentChannel(data.id));
        hideModal();
      } catch (err) {
        f.setSubmitting(true);
        if (err.isAxiosError) {
          inputEl.current.select();
        }
        throw err;
      } finally {
        f.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-3"
              disabled={f.isSubmitting}
              ref={inputEl}
              type="text"
              name="name"
              id="name"
              placeholder="Введите название канала..."
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              isInvalid={(f.errors.name && f.touched.name) || !!f.status}
              value={f.values.name}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.name || f.status}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                className="me-2"
                variant="secondary"
                onClick={hideModal}
              >
                Отменить
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={f.isSubmitting}
              >
                Добавить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Add;
