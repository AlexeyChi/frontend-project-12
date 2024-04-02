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
    const removeChannel = (payload) => dispatch(channelsActions.removeChannel(payload));
    const renameChannel = (payload) => dispatch(channelsActions.renameChannel(payload));

    socket.on('newMessage', addNewMessage);
    socket.on('newChannel', addNewChannel);
    socket.on('removeChannel', removeChannel);
    socket.on('renameChannel', renameChannel);

    return () => {
      socket.off('newMessage', addNewMessage);
      socket.off('newChannel', addNewChannel);
      socket.off('removeChannel', removeChannel);
      socket.off('renameChannel', renameChannel);
    };
  }, [socket, dispatch]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ChatApiProvider;
