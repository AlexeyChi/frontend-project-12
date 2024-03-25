import { useSelector } from 'react-redux';
import { selectChannels } from '../../../../slices/channelsSlice';
import ChatHeader from './ChatHeader';
import CommentsField from './CommentsField';
import InputField from './InputField';

const ChatContainer = () => {
  const channels = useSelector(selectChannels);
  const activeId = useSelector((state) => state.ui.activeChannelId);
  const channel = channels.find(({ id }) => id === activeId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeader />
        <CommentsField />
        <InputField channel={channel} />
      </div>
    </div>
  );
};

export default ChatContainer;
