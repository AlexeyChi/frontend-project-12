import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

const Delete = () => {
  const dispatch = useDispatch();
  const channels = '1'; // <-- change this
  const handleDeleteChannel = async () => {
    const deletedChannel = channels.find();
    try {
      return await axios('some route', deletedChannel);
    } catch (err) {
      console.log(err); // <-- change this
    };
  };

  return (
    <Modal>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>
            Удалить канал
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Уверены,
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Отменить</Button>
          <Button variant="primary">Удалить</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default Delete;
