import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const Channel = ({
  channel,
  isCurrent,
  handleChoose,
  handleDelete,
  handleRename,
}) => {
  const variant = isCurrent ? 'secondary' : null;

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              type="button"
              className="w-100 rounded-0 text-start text-truncate"
              onClick={handleChoose(channel.id)}
              variant={variant}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>

            <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
              <span className="visually-hidden">Меню</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDelete(channel.id)}>Удалить</Dropdown.Item>
              <Dropdown.Item onClick={handleRename(channel.id)}>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <Button
            type="button"
            variant={variant}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleChoose(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        )}
    </li>
  );
};

export default Channel;
