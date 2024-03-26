import { useState } from 'react';

import Add from './Add';
import Rename from './Rename';
import Delete from './Delete';

const mapping = {
  adding: Add,
  renaming: Rename,
  deleting: Delete,
};

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = mapping(modalInfo.type);
  return <Component />
};

const Modal = () => {
  const [modalInfo, setModalInfo] = useState({type: null});
  const showModal = (type) => setModalInfo({ type });
  const hideModal = () => setModalInfo({type: null});

  return (
    renderModal({ modalInfo, hideModal })
  )
};

export default Modal;
