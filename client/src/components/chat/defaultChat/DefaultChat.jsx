import LOGO from "../../../ascets/logo.png";

import "./DefaultChat.css";
const DefaultChat = () => {
  return (
    <div className="chat">
      <div className="chat__inner">
        <img src={LOGO} alt="Logo" />
        <h1>Default Chat</h1>
        <p>Click on chat or add chat to open your messages</p>
        <hr />
      </div>
    </div>
  );
};

export default DefaultChat;
