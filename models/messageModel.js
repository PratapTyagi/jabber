import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema({
  username: String,
  message: String,
  timestamp: String,
  received: { type: ObjectId, ref: "usercontents" },
});

export default mongoose.model("messagecontents", schema);
