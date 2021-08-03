import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/dark-01/image/upload/v1623783636/pixlr-bg-result_sa4w7l.png",
  },
  rooms: [
    {
      type: ObjectId,
      ref: "roomcontents",
    },
  ],
});

export default mongoose.model("usercontents", schema);
