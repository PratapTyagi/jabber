import { useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  SearchOutlined,
  DonutLargeSharp,
  ForumSharp,
} from "@material-ui/icons";

import SidebarChat from "./SidebarChat";
import axios from "../../axios";
import "./Sidebar.css";

const Sidebar = () => {
  const [rooms, setrooms] = useState([]);
  const [open, setOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("currentUser")).token;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location = "/";
  };

  useEffect(() => {
    const apiReq = async () => {
      const { data } = await axios.get("/rooms/sync", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    };

    apiReq()
      .then((info) => setrooms(info))
      .catch((err) => console.log(err));
  }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://avatars.githubusercontent.com/u/45279411?v=4" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeSharp />
          </IconButton>
          <IconButton>
            <ForumSharp />
          </IconButton>
          <FormControl className="icon__form">
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Select>
          </FormControl>
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
