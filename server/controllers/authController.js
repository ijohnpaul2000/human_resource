const User = require("../models/").User;
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

const login = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log(user.password);

  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({
    id: user.id,
    username: user.username,
    date_added: user.date_added,
    hashedPassword: user.password,
    user_level: user.user_level,
    token: generateToken(user.id),
  });
});

module.exports = { login };
