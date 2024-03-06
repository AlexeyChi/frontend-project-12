import ChannelsHead from './ChannelsHead';
import ChannelList from './ChannelList';

const ChannelsContaner = () => (
  <div className="row h-100 bg-white flex-md-row">
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHead />
      <ChannelList />
    </div>
  </div>
);

export default ChannelsContaner;
