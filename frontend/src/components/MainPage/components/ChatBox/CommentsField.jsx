import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const CommentsField = () => {
  const activeId = useSelector((state) => state.ui.activeChannelId);
  const getMessages = useSelector((state) => state.messages);
  const messages = Object
    .values(getMessages.entities)
    .filter(({ channelId }) => channelId === activeId);

  const srcollRef = useRef(null);

  useEffect(() => {
    srcollRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map(({ id, username, body }) => (
        <div key={id} className="text-break mb-2" ref={srcollRef}>
          <b>{username}</b>
          {': '}
          {body}
        </div>
      ))}
    </div>
  );
};

export default CommentsField;
