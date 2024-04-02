import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';

import Add from './Add';
import Rename from './Rename';
import Delete from './Delete';
import { actions as uiActions } from '../../slices/ui';

const mapping = {
  adding: Add,
  renaming: Rename,
  deleting: Delete,
};

const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.ui.modal.isOpened);
  const hideModal = () => dispatch(uiActions.closeModal());

  const modalType = useSelector((state) => state.ui.modal.type);

  const Component = mapping[modalType];

  return (
    <BootstrapModal show={showModal} onHide={hideModal} centered>
      {Component && <Component hideModal={hideModal} />}
    </BootstrapModal>
  );
};

export default Modal;
