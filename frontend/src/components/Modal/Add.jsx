import * as yup from 'yup';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { selectChannels, actions as channelsActions } from '../../slices/channelsSlice';
import { actions as uiActions } from '../../slices/ui';
import routes from '../../routes';

const nameValidationSchema = (channels) => yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'errors.inValidLength')
    .max(20, 'errors.inValidLength')
    .required('errors.required')
    .notOneOf(channels, 'errors.notUniqueName'),
});

const Add = ({ hideModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsNames = useSelector(selectChannels).map(({ name }) => name);
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, [inputEl]);

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
        toast.success(t('modals.addChannel'));
        hideModal();
      } catch (err) {
        f.setSubmitting(true);
        if (err.isAxiosError) {
          inputEl.current.select();
          toast.error(t('errors.network'));
        }
        toast.error(t('errors.unknown'));
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
          <h4>{t('modals.addChannelHeader')}</h4>
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
              placeholder={t('modals.enterChannelName')}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              isInvalid={(f.errors.name && f.touched.name) || !!f.status}
              value={f.values.name}
            />
            <Form.Control.Feedback type="invalid">
              {t(f.errors.name) || f.status}
            </Form.Control.Feedback>
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
                {t('modals.addBtn')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Add;
