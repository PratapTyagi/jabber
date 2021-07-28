import { useEffect, useState } from "react";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ForumIcon from "@material-ui/icons/Forum";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import axios from "../../axios";

const Sidebar = () => {
  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    const apiReq = async () => {
      const { data } = await axios.get("/rooms/sync");
      return data;
    };

    apiReq()
      .then((info) => setrooms(info))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://avatars.githubusercontent.com/u/45279411?v=4" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ForumIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
