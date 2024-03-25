import { useSelector, useDispatch } from 'react-redux';
import { selectChannels } from '../../../../slices/channelsSlice.js';

import { actions as uiActions } from '../../../../slices/ui.js';
import Channel from './Channel';

const ChannelList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const activeChannelId = useSelector((state) => state.ui.activeChannelId);

  const handleChooseCurrent = (currId) => () => {
    dispatch(uiActions.setCurrentChannel(currId));
  };

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(({ id, name }) => (
        <Channel
          key={id}
          channel={name}
          isCurrent={id === activeChannelId}
          handleChoose={handleChooseCurrent(id)}
        />
      ))}
    </ul>
  );
};

export default ChannelList;
