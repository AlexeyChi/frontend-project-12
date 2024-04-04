import * as yup from 'yup';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { selectChannels, actions as channelActions } from '../../slices/channelsSlice';
import routes from '../../routes';

const nameValidationSchema = (channels) => yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'errors.inValidLength')
    .max(20, 'errors.inValidLength')
    .required('errors.required')
    .notOneOf(channels, 'errors.notUniqueName'),
});

const Rename = ({ hideModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
        toast.success(t('modals.renameChannel'));
        hideModal();
      } catch (err) {
        f.setSubmitting(true);
        if (err.isAxiosError) {
          toast.error(t('errors.network'));
          inputEl.current.select();
        }
        toast.error(t('errors.unknown'));
        throw err;
      } finally {
        f.isSubmitting(false);
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4>{t('modals.renameChannelHeader')}</h4>
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
              {t(f.errors.name) || f.status}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={hideModal}
            >
              {t('modals.cancelBtn')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={f.isSubmitting}
            >
              {t('modals.sendBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
