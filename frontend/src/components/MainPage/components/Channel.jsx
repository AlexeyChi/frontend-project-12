const Channel = ({ channel }) => (
  <li className="nav-item w-100">
    <button type="button" className="w-100 rounded-0 text-start btn">
      <span className="me-1">#</span>
      {channel}
    </button>
  </li>
);

export default Channel;
