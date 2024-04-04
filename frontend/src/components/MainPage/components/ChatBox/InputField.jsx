import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';

import sendIcon from '../../../../assets/send.svg';

const InputField = ({ channel }) => {
  const [messageText, setMessageText] = useState('');
  const inputEl = useRef();
  const { t } = useTranslation();

  const activeChannelId = useSelector((state) => state.ui.activeChannelId);
  const { token, username } = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    setTimeout(() => inputEl.current.focus());
  }, [channel]);

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleAddNewMessage = async (e) => {
    e.preventDefault();
    const message = {
      body: messageText,
      channelId: activeChannelId,
      username,
    };
    try {
      setMessageText('');
      inputEl.current.focus();
      return await axios.post('/api/v1/messages', message, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        inputEl.current.select();
      }
      throw err;
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={(e) => handleAddNewMessage(e)}>
        <InputGroup hasValidation>
          <Form.Control
            ref={inputEl}
            name="body"
            placeholder={t('chat.addMessage')}
            className="border-0 p-0 ps-2"
            aria-label={t('chat.newMessage')}
            onChange={(e) => handleChange(e)}
            value={messageText}
            required
          />
          <Button type="submit" variant="" className="btn-group-vertical">
            <img src={sendIcon} style={{ height: 20 }} alt={t('chat.sendBtn')} />
            <span className="visually-hidden">{t('chat.newMessage')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default InputField;
