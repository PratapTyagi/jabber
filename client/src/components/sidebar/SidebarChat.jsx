import axios from "../../axios";
import { Avatar } from "@material-ui/core";

import "./SidebarChat.css";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, room }) => {
  const createChat = async () => {
    const fetchedName = prompt("Enter the name of room");
    if (fetchedName) {
      await axios
        .post("/rooms/new", {
          name: fetchedName,
        })
        .catch((err) => console.log(err));
    }
  };

  return addNewChat ? (
    <div className="sidebarChat" onClick={createChat}>
      <div className="sidebarChat_right">
        <h2>Add New Chat</h2>
      </div>
    </div>
  ) : (
    <Link to={`/rooms/${room._id}`} style={{ textDecoration: "none" }}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${
            Math.random() * 5000
          }.svg`}
        />
        <div className="sidebarChat_right">
          <h2>{room.name}</h2>
          <p>Last Message</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
