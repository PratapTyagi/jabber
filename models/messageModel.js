import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: String,
  message: String,
  timestamp: String,
  received: Boolean,
});

export default mongoose.model("messagecontents", schema);
