import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.json({ error: "Please add all the fields" });
  }
  User.find({ email }).then((savedUser) => {
    if (savedUser) {
      return res.json({ error: "User already exists" });
    }
    bcrypt
      .hash(password, 20)
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
