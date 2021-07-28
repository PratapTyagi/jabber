import { useState, useEffect } from "react";

import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  Mic,
  InsertEmoticon,
  Send,
} from "@material-ui/icons";

import "./Chat.css";
import axios from "../../axios";

import { useParams } from "react-router-dom";

const Chat = ({ messages, setMessages }) => {
  const [input, setinput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (roomId)
      axios
        .get(`/rooms/sync/${roomId}`)
        .then(({ data }) => setRoomName(data.name))
        .catch((error) => console.error(error));
  }, [roomId]);

  const sendMessage = async (e) => {
    await axios.post("/messages/new", {
      username: "Rajeev Tyagi",
      message: input,
      timestamp: "2/2/12",
      received: false,
    });

    setinput("");
  };

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
          <IconButton>
            <MoreVert />
          </IconButton>
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
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            <Send />
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
