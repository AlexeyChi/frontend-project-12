// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChannels } from '../../slices/channelsSlice.js';

import useAuth from '../../hooks/index.jsx';
import ChannelsContaner from './components/ChannelsContainer';

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const headers = auth.getAuthHeaders();
  dispatch(fetchChannels(headers));

  return (
    <div className="container h-100 mb-4 overflow-hidden rounded shadow">
      <ChannelsContaner />
    </div>
  );
};

export default MainPage;
