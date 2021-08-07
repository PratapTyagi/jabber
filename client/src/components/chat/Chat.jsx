import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Avatar,
  FormControl,
  IconButton,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  Mic,
  InsertEmoticon,
  Send,
} from "@material-ui/icons";

import axios from "../../axios";
import Pusher from "pusher-js";

import "./Chat.css";

const Chat = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [input, setinput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [openButton, setOpenButton] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // Room names
  useEffect(() => {
    if (roomId)
      axios
        .get(`/rooms/sync/${roomId}`)
        .then(({ data }) => setRoomName(data.name))
        .catch((error) => console.error(error));
  }, [roomId]);

  // All user instead of members in room
  const getAllUsers = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/users/allusers",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  };

  // Add user in room
  const addUser = async (userId) => {
    await axios
      .post(
        "/users/addUser",
        {
          roomId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
      .then((res) => setOpenButton(true))
      .catch((err) => console.log(err));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      username: currentUser.name,
      message: input,
      timestamp: "2/2/12",
      received: false,
      roomId,
    });

    setinput("");
  };

  // Pusher working

  // All messages
  useEffect(() => {
    axios
      .post("/messages/sync", { roomId })
      .then(({ data }) => setMessages(data))
      .catch((err) => console.log(err));
  }, [roomId]);

  useEffect(() => {
    const pusher = new Pusher("3203ea64068316222fee", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    // Clean up function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>{roomName || "Room name"}</h3>
          <p>Last seen at</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <FormControl className="icon__form" onClick={getAllUsers}>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
            >
              <MenuItem value="">
                <strong className="addUsers">Add Users</strong>
              </MenuItem>

              {users.map((user) => (
                <MenuItem key={user._id} className="addUsers__item">
                  <div className="addUsers__item__left">
                    <Avatar
                      src={user.pic}
                      alt="Dp"
                      className="addUsers__item__avatar"
                    />
                    <div className="center">
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  {!openButton ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addUser(user._id);
                      }}
                    >
                      Add
                    </button>
                  ) : null}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((m) => (
          <p
            key={m._id}
            className={`chat_message ${m.received && "chat_receiver"}`}
          >
            <span className="chat_name">{m.username}</span>
            {m.message}
            <span className="chat_timestamp">{m.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">
            <Send />
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
