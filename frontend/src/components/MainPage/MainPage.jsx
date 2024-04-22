import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/index.jsx';
import { fetchChannels } from '../../slices/channelsSlice.js';
import { fetchMessages } from '../../slices/messagesSlise.js';
import Modal from '../Modal/Modal.jsx';
import ChannelsContaner from './components/ChannelsBox/ChannelsContainer.jsx';
import ChatContainer from './components/ChatBox/ChatContainer.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    try {
      const headers = auth.getAuthHeaders();
      dispatch(fetchChannels(headers));
      dispatch(fetchMessages(headers));
    } catch (err) {
      rollbar.error('somthing is wrong', err);
      toast.error(t('errors.auth'));
    }
  }, [dispatch, auth, t, rollbar]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Modal />
        <ChannelsContaner />
        <ChatContainer />
      </div>
    </div>
  );
};

export default MainPage;
