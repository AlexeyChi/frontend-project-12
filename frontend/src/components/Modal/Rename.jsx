import * as yup from 'yup';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

import { selectChannels, actions as channelActions } from '../../slices/channelsSlice';
import routes from '../../routes';

const nameValidationSchema = (channels) => yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'Must be 3 characters or more')
    .max(20, 'Must be 20 characters or less')
    .required('Required')
    .notOneOf(channels, 'Not unique name'),
});

const Rename = ({ hideModal }) => {
  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const channelsNames = channels.map(({ name }) => name);
  const id = useSelector((state) => state.ui.modal.selectId);
  const { name } = channels.find((channel) => channel.id === id);

  const inputEl = useRef();

  useEffect(() => {
    setTimeout(() => inputEl.current.select());
  }, []);

  const f = useFormik({
    initialValues: { name },
    validationSchema: nameValidationSchema(channelsNames),
    onSubmit: async (values) => {
      try {
        nameValidationSchema(channelsNames).validateSync(values);
        const { token } = JSON.parse(localStorage.getItem('userId'));
        const { data } = await axios.patch(routes.api.channelPath(id), values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(channelActions.renameChannel(data));
        hideModal();
      } catch (err) {
        f.setSubmitting(true);
        if (err.isAxiosError) {
          inputEl.current.select();
        }
      } finally {
        f.isSubmitting(false);
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          Переименовать канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              disabled={f.isSubmitting}
              ref={inputEl}
              type="text"
              name="name"
              id="name"
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              isInvalid={(f.errors.name && f.touched.name) || !!f.status}
              value={f.values.name}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.name || f.status}
            </Form.Control.Feedback>
          </Form.Group>
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
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
