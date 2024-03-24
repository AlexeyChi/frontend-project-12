import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { ApiContext } from '../contexts/index';
import { actions as messagesActions } from '../slices/messagesSlise';

const ChatApiProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  const value = useMemo(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });

    // const socketPromise = (action, cb) => (data, handler) => new Promise((resolve, reject) => {
    //   socket.emit(action, data, (error, response) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       if (cb) {
    //         cb(handler, response);
    //       }
    //       resolve(response);
    //     }
    //   });
    // });

    // return {
    //   addNewMessage: socketPromise('newMessage'),
    // };
  }, [socket, dispatch]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ChatApiProvider;
