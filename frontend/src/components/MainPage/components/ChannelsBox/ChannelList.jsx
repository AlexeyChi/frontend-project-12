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

  const handleDeleteCurrent = (currId) => () => {
    dispatch(uiActions.openModal({ type: 'deleting', selectId: currId }));
  };
  const handleRenameCurrent = (currId) => () => {
    dispatch(uiActions.openModal({ type: 'renaming', selectId: currId }));
  };

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          isCurrent={channel.id === activeChannelId}
          handleChoose={handleChooseCurrent}
          handleDelete={handleDeleteCurrent}
          handleRename={handleRenameCurrent}
        />
      ))}
    </ul>
  );
};

export default ChannelList;
