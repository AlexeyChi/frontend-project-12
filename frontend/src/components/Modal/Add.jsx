import * as yup from 'yup';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import { useAuth } from '../../hooks';
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
  const { loggedIn } = useAuth();
  const rollbar = useRollbar();
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
    onSubmit: async ({ name }) => {
      try {
        const filteredName = {
          name: leoProfanity.clean(name),
        };
        nameValidationSchema(channelsNames).validateSync(filteredName);
        const { token } = loggedIn;
        const { data } = await axios.post(routes.api.channelsPath(), filteredName, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(channelsActions.addChannel(data));
        dispatch(uiActions.setCurrentChannel(data.id));
        toast.success(t('modals.addChannel'));
        hideModal();
      } catch (err) {
        rollbar.error(err);
        f.setSubmitting(false);
        if (!err.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        toast.error(t('errors.network'));
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
              {t(f.errors.name)}
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
