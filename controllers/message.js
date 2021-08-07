import Message from "../models/messageModel.js";
import Room from "../models/roomsModel.js";

export const createMessage = (req, res) => {
  const { username, message, timestamp, roomId } = req.body;

  const data = new Message({
    username,
    message,
    timestamp,
    received: req.user._id,
  });

  try {
    data.save().then((savedMessage) =>
      Room.findByIdAndUpdate(
        roomId,
        {
          $push: { messages: savedMessage._id },
        },
        { new: true }
      )
        .then((room) => {
          return res.json(room);
        })
        .catch((err) => console.log(err))
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMessage = (req, res) => {
  const { roomId } = req.body;
  try {
    Room.findOne({ _id: roomId })
      .populate("messages", "username message timestamp received")
      .then((result) => {
        res.json(result.messages);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(400).send(error);
  }
};
