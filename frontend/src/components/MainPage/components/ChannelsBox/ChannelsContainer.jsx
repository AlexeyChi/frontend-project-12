import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { actions as usActions } from '../../../../slices/ui';
import ChannelList from './ChannelList';
import addChannel from '../../../../assets/add_channel.svg';

const ChannelsContaner = () => {
  const dispatch = useDispatch();

  const handleAddNewChannel = () => {
    dispatch(usActions.openModal({ type: 'adding' }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddNewChannel}
        >
          <img src={addChannel} alt="Добавить канал" />
          <span className="visually-hidden">Добавить канал</span>
        </Button>
      </div>
      <ChannelList />
    </div>
  );
};

export default ChannelsContaner;
