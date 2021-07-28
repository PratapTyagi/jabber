import roomsModel from "../models/roomsModel.js";

export const createRoom = async (req, res) => {
  const { name } = req.body;

  const data = new roomsModel({
    name,
  });

  try {
    await data.save();

    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getRooms = async (req, res) => {
  try {
    const data = await roomsModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getRoomWithId = async (req, res) => {
  try {
    const room = await roomsModel.findOne({ _id: req.params.id });
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(room);
  }
};
