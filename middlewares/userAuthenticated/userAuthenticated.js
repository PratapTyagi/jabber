import jwt from "jsonwebtoken";
import keys from "../../config/keys.js";
import User from "../../models/userModel.js";
const secret = keys.JWT_SECRET;

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.json({ error: "You must login first" });

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, secret, (error, payload) => {
    if (error) {
      return res.json({ error: "You must be logged in" });
    }
    const { _id } = payload;
    User.findById(_id)
      .then((userData) => {
        req.user = userData;
        next();
      })
      .catch((err) => console.log(err));
  });
};
