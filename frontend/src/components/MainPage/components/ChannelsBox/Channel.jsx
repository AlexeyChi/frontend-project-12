import { Button } from 'react-bootstrap';

const Channel = ({ channel, isCurrent, handleChoose }) => {
  const variant = isCurrent ? 'secondary' : '';

  return (
    <li className="nav-item w-100">
      <Button
        type="button"
        variant={variant}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={handleChoose}
      >
        <span className="me-1">#</span>
        {channel}
      </Button>
    </li>
  );
};

export default Channel;
