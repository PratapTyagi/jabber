import { useState, useEffect } from "react";
import { SignUp, SignIn, DefaultChat, Chat, Sidebar } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Pusher from "pusher-js";
import axios from "./axios";

export const Routing = () => {
  const [messages, setMessages] = useState([]);
  const currentUser = localStorage.getItem("currentUser");

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
    <>
      <Router>
        <Switch>
          {currentUser ? (
            <>
              <Route exact path="/">
                <div className="app_body">
                  <Sidebar />
                  <DefaultChat />
                </div>
              </Route>
              <Route path="/rooms/:roomId">
                <div className="app_body">
                  <Sidebar />
                  <Chat messages={messages} setMessages={setMessages} />
                </div>
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/" component={SignUp} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
            </>
          )}
        </Switch>
      </Router>
    </>
  );
};
