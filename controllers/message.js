import messageContent from "../models/messageModel.js";

export const getMessage = async (req, res) => {
  try {
    const getMessages = await messageContent.find();
    res.status(200).send(getMessages);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createMessage = async (req, res) => {
  const { username, message, timestamp, received } = req.body;

  const data = new messageContent({
    username,
    message,
    timestamp,
    received,
  });

  try {
    await data.save();

    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};
