import { useState, useEffect } from "react";
import "./App.css";

import { SignUp, Chat, Sidebar } from "./components";

import axios from "./axios";
import Pusher from "pusher-js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((res) => setMessages(res.data));
  }, []);

  useEffect(() => {
    var pusher = new Pusher("075d79a93dc93f86b729", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
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
    <div className="app">
      <div className="app_body">
        <Router>
          <Switch>
            <Route exact path="/">
              <SignUp />
            </Route>
            <Route path="/rooms/:roomId">
              <Sidebar />
              <Chat messages={messages} setMessages={setMessages} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
