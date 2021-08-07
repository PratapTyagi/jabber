import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";

import postMesssage from "./routes/message.js";
import rooms from "./routes/rooms.js";
import users from "./routes/users.js";

import keys from "./config/keys.js";

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pusher = new Pusher(keys.PUSHER);

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
      pusher
        .trigger("messages", "inserted", messageDetails)
        .catch((err) => console.log(err));
    }
  });
});

const PORT = process.env.PORT || 5000;

const CONNECTION_URL = keys.MONGOURL;

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
