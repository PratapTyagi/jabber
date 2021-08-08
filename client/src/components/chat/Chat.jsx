import { useState, useEffect } from "react";
import { Link, Route, useLocation, useParams } from "react-router-dom";

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
  const { pathname } = useLocation();
  const { roomId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [input, setinput] = useState("");
  const [room, setRoom] = useState({});
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // For select dropdown
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // Room info
  useEffect(() => {
    const rooms = JSON.parse(localStorage.getItem("rooms"));
    const data = rooms.filter((e) => e._id === roomId);
    setRoom(data[0]);
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    let timestamp = new Date();
    timestamp =
      (timestamp.getHours() > 12
        ? timestamp.getHours() - 12
        : timestamp.getHours()) +
      ":" +
      timestamp.getMinutes() +
      (timestamp.getHours > 12 ? "PM" : "AM");
    await axios.post(
      "/messages/new",
      {
        username: currentUser.name,
        message: input,
        timestamp,
        roomId,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    setinput("");
  };

  // Pusher working

  // All messages
  useEffect(() => {
    axios
      .post(
        "/messages/sync",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
      .then(({ data }) => setMessages(data))
      .catch((err) => console.log(err));
  }, [roomId]);

  // Real Time part
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
        <Avatar src={`${room.pic}`} />

        <div className="chat_headerInfo">
          <h3>{room.name || "Room name"}</h3>
          <p>Last seen at</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
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
                <Link
                  to={{
                    pathname: `${pathname}/allusers`,
                    state: { roomId, currentUser },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <strong className="addUsers">Add Users</strong>
                </Link>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((m) => (
          <p
            key={m._id}
            className={`chat_message ${
              m.received === currentUser._id && "chat_receiver"
            }`}
          >
            {m.received != currentUser._id && (
              <span className="chat_name">{m.username}</span>
            )}
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
