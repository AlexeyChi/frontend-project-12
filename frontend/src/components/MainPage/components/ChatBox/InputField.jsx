import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';

import sendIcon from '../../../../assets/send.svg';

const InputField = ({ channel }) => {
  const [messageText, setMessageText] = useState('');
  const inputEl = useRef();

  const activeChannelId = useSelector((state) => state.ui.activeChannelId);
  const { token, username } = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    inputEl.current.focus();
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
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
            aria-label="Новое сообщение"
            onChange={(e) => handleChange(e)}
            value={messageText}
            required
          />
          <Button type="submit" variant="" className="btn-group-vertical">
            <img src={sendIcon} style={{ height: 20 }} alt="Отправить сообщение" />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default InputField;
