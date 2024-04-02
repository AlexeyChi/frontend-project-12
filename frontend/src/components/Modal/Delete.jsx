import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { actions as channelsActions } from '../../slices/channelsSlice';
import routes from '../../routes';

const Delete = ({ hideModal }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.ui.modal.selectId);

  const handleDeleteChannel = async () => {
    setLoading(true);
    try {
      const { token } = JSON.parse(localStorage.getItem('userId'));
      await axios.delete(routes.api.channelPath(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(channelsActions.removeChannel(id));
      hideModal();
    } catch (err) {
      if (err.isAxiosError) {
        setLoading(false);
      }
      console.log(err);
      throw err;
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
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
            variant="danger"
            disabled={loading}
            onClick={handleDeleteChannel}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Delete;
