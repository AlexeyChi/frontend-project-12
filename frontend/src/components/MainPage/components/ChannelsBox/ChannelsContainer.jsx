import ChannelsHead from './ChannelsHead';
import ChannelList from './ChannelList';

const ChannelsContaner = () => (
  <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <ChannelsHead />
    <ChannelList />
  </div>
);

export default ChannelsContaner;
