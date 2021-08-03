import Rooms from "../models/roomsModel.js";
import User from "../models/userModel.js";

export const createRoom = (req, res) => {
  const { name, pic } = req.body;

  const data = new Rooms({
    name,
    pic,
    members: req.user._id,
  });

  try {
    data
      .save()
      .then((room) => {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { rooms: room._id },
          },
          { new: true }
        ).exec((err, result) => {
          if (err) {
            return res.json({ error: err });
          } else {
            return res.json(result);
          }
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getRooms = (req, res) => {
  try {
    Rooms.find({ members: { $in: req.user._id } })
      .then((room) => {
        res.status(200).send(room);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getRoomWithId = (req, res) => {
  try {
    const room = roomsModel.findOne({ _id: req.params.id });
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
};
