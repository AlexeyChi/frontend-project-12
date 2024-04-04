import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { actions as channelsActions } from '../../slices/channelsSlice';
import routes from '../../routes';

const Delete = ({ hideModal }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      toast.success(t('modals.removeChannel'));
      hideModal();
    } catch (err) {
      if (err.isAxiosError) {
        setLoading(false);
        toast.error(t('errors.network'));
      }
      toast.error(t('errors.unknown'));
      throw err;
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4>{t('modals.removeChannelHeader')}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.areYouShure')}</p>
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
            variant="danger"
            disabled={loading}
            onClick={handleDeleteChannel}
          >
            {t('modals.removeBtn')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Delete;
