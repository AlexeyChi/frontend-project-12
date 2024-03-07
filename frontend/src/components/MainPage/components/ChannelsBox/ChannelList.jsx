import { useSelector } from 'react-redux';
import { selectChannels } from '../../../../slices/channelsSlice.js';

import Channel from './Channel';

const ChannelList = () => {
  const channels = useSelector(selectChannels);

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(({ id, name }) => <Channel key={id} channel={name} />)}
    </ul>

  );
};

export default ChannelList;
