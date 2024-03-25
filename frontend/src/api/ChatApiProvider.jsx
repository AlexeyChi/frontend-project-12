import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { ApiContext } from '../contexts/index';
import { actions as messagesActions } from '../slices/messagesSlise';

const ChatApiProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  const value = useMemo(() => {
    const addNewMessage = (payload) => dispatch(messagesActions.addMessage(payload));

    socket.on('newMessage', addNewMessage);

    return () => {
      socket.off('newMessage', addNewMessage);
    };
  }, [socket, dispatch]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ChatApiProvider;
