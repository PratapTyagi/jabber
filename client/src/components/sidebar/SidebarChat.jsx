import axios from "../../axios";
import { Avatar } from "@material-ui/core";

import "./SidebarChat.css";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, room }) => {
  const token = JSON.parse(localStorage.getItem("currentUser")).token;

  const createChat = async () => {
    const fetchedName = prompt("Enter the name of room");
    if (fetchedName) {
      await axios
        .post(
          "/rooms/new",
          {
            name: fetchedName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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
        <Avatar src={room.pic} />
        <div className="sidebarChat_right">
          <h2>{room.name}</h2>
          <p>Last Message</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
