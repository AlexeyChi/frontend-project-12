import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as uiActions } from '../../slices/ui';
import routes from '../../routes';

const Delete = ({ hideModal }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loggedIn } = useAuth();
  const id = useSelector((state) => state.ui.modal.selectId);

  const handleDeleteChannel = async () => {
    setLoading(true);
    try {
      const { token } = loggedIn;
      await axios.delete(routes.api.channelPath(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(channelsActions.removeChannel(id));
      dispatch(uiActions.setCurrentChannel('1'));
      toast.success(t('modals.removeChannel'));
      hideModal();
    } catch (err) {
      if (err.isAxiosError) {
        setLoading(false);
        toast.error(t('errors.network'));
        return;
      }
      toast.error(t('errors.unknown'));
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
