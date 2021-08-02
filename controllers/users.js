import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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
            const { _id, name, email, pic } = savedUser;
            return res.json({
              user: { _id, name, email, pic },
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
