import classNames from 'classnames';
import { useSelector } from 'react-redux';

const Channel = ({ id, channel }) => {
  const activChannel = useSelector((state) => state.channels.activeChannelId);

  const defaultClasses = ['w-100', 'rounded-0', 'text-start', 'btn'];
  const chennelClasses = classNames(
    ...defaultClasses,
    {
      'btn-secondary': +id === activChannel,
    },
  );

  return (
    <li className="nav-item w-100">
      <button type="button" className={chennelClasses}>
        <span className="me-1">#</span>
        {channel}
      </button>
    </li>
  );
};

export default Channel;
