import { useSelector } from 'react-redux';
import { selectChannels } from '../../../../slices/channelsSlice';
import CommentsField from './CommentsField';
import InputField from './InputField';

const ChatContainer = () => {
  const channels = useSelector(selectChannels);
  const activeId = useSelector((state) => state.ui.activeChannelId);
  const messages = useSelector((state) => state.messages.entities);

  const channel = channels.find(({ id }) => id === activeId);
  const activeChannelMesages = Object
    .values(messages)
    .filter(({ channelId }) => channelId === activeId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {`# ${channel?.name}`}
            </b>
          </p>
          <span className="text-muted">
            {`${activeChannelMesages.length} сообщение`}
          </span>
        </div>
        <CommentsField />
        <InputField channel={channel} />
      </div>
    </div>
  );
};

export default ChatContainer;
