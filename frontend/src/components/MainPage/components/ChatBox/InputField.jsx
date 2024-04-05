import axios, { isAxiosError } from 'axios';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import { useAuth } from '../../../../hooks';
import { actions as messagesActions } from '../../../../slices/messagesSlise';
import routes from '../../../../routes';
import sendIcon from '../../../../assets/send.svg';

const InputField = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loggedIn } = useAuth();
  const inputEl = useRef();

  const activeChannelId = useSelector((state) => state.ui.activeChannelId);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required('Required'),
  });

  const f = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async ({ body }) => {
      const { token, username } = loggedIn;
      try {
        f.setSubmitting(false);
        const filteredText = leoProfanity.clean(body);
        const message = {
          body: filteredText,
          channelId: activeChannelId,
          username,
        };
        const { data } = await axios.post(routes.api.messagesPath(), message, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(messagesActions.addMessage(data));
        f.resetForm();
        inputEl.current.select();
      } catch (err) {
        f.setSubmitting(false);
        if (!isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        toast.error(t('errors.network'));
      }
    },
  });

  useEffect(() => {
    inputEl.current?.focus();
  }, [channel, f.isSubmitting]);

  return (
    <div className="mt-auto px-4 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={f.handleSubmit}>
        <InputGroup hasValidation>
          <Form.Control
            ref={inputEl}
            disabled={f.isSubmitting}
            name="body"
            placeholder={t('chat.addMessage')}
            className="border-0 p-0 ps-2"
            aria-label={t('chat.newMessage')}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            value={f.values.body}
            required
          />
          <Button
            type="submit"
            disabled={f.isSubmitting}
            variant=""
            className="btn-group-vertical"
          >
            <img src={sendIcon} style={{ height: 20 }} alt={t('chat.sendBtn')} />
            <span className="visually-hidden">{t('chat.newMessage')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default InputField;
