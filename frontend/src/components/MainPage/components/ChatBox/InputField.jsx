import { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import arrowRigthSvg from '../../../../assets/arrow-right.svg';

const InputField = () => {
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2">
        <InputGroup hasValidation>
          <Form.Control
            ref={inputEl}
            name="body"
            type="text"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
            value=""
          />
          <Button className="btn-group-vertical">
            <img src={arrowRigthSvg} alt="Отправить сообщение" />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default InputField;
