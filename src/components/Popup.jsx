

const Popup = (props) => {
  return (
    <div className={`pop-up-container ${!props.hide ? "" : "hide"}`}>
      <div className="pop-up status-icon">{props.icon}</div>
      <div className="pop-up status-text">{props.status}</div>
    </div>
  );
};
export default Popup