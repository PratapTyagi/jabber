import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";

import postMesssage from "./routes/message.js";
import rooms from "./routes/rooms.js";
import users from "./routes/users.js";

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pusher = new Pusher({
  appId: "1199107",
  key: "075d79a93dc93f86b729",
  secret: "47c0aec4015b6b38473a",
  cluster: "ap2",
  useTLS: true,
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/messages", postMesssage);
app.use("/api/v1/rooms", rooms);
app.use("/api/v1/users", users);

const db = mongoose.connection;

db.once("open", () => {
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.username,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

const CONNECTION_URL =
  "mongodb+srv://admin:1RyXYdOqVKj8yFSO@cluster0.y1kf2.mongodb.net/chat-app?retryWrites=true&w=majority";

// Building connection
mongoose
  .connect(CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((e) => {
    console.log(e.message);
  });

// For getting no warnings in console
mongoose.set("useFindAndModify", false);
