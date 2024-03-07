import ChatHeader from './ChatHeader';
import CommentsField from './CommentsField';
import InputField from './InputField';

const ChatContainer = () => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <ChatHeader />
      <CommentsField />
      <InputField />
    </div>
  </div>
);

export default ChatContainer;
