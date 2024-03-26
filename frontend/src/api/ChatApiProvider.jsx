import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { ApiContext } from '../contexts/index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlise';

const ChatApiProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  const value = useMemo(() => {
    const addNewMessage = (payload) => dispatch(messagesActions.addMessage(payload));
    const addNewChannel = (payload) => dispatch(channelsActions.addChannel(payload));

    socket.on('newMessage', addNewMessage);
    socket.on('newChannel', addNewChannel);

    return () => {
      socket.off('newMessage', addNewMessage);
      socket.off('newChannel', addNewChannel);
    };
  }, [socket, dispatch]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ChatApiProvider;
