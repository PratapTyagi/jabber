import User from "../models/userModel.js";
import Room from "../models/roomsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import keys from "../config/keys.js";

export const registerUser = (req, res) => {
  const { name, email, password, pic } = req.body;

  User.findOne({ email }).then((savedUser) => {
    if (savedUser) {
      return res.json({ error: "User already exists" });
    }
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          pic,
        });
        newUser
          .save()
          .then((user) => {
            return res.json({ message: "User saved successfully" });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("-__v")
    .then((savedUser) => {
      if (!savedUser) return res.json({ error: "Invalid email or password" });
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, keys.JWT_SECRET);
            const { _id, name, email, pic } = savedUser;
            return res.json({
              user: { _id, name, email, pic, token },
              message: "Successfully Logged In",
            });
          } else {
            return res.json({ error: "Invalid email or password" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.json({ error: "Server Error" }));
};

export const getAllUsers = (req, res) => {
  User.find({ _id: { $ne: req.user._id } })
    .select("-password -rooms -__v")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};

export const addUser = (req, res) => {
  const { roomId, userId } = req.body;

  Room.findByIdAndUpdate(
    roomId,
    {
      $push: { members: userId },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      console.log(err);
    } else {
      User.findByIdAndUpdate(
        userId,
        {
          $push: { rooms: roomId },
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.json({ error: err });
        } else {
          return res.json(result);
        }
      });
    }
  });
};
