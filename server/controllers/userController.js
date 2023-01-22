const User = require("../models").User;
const expressAsyncHandler = require("express-async-handler");
const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");

//@route POST /api/users
//@desc Create a new user
//@access Public
const POSTuser = expressAsyncHandler(async (req, res) => {
  const {
    id,
    firstname,
    middlename,
    lastname,
    username,
    password,
    user_level,
    email,
  } = req.body;

  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const gensalt = 10;
  const hashedPassword = await bcrypt.hash(password, gensalt);

  try {
    const newUser = {
      id: v4(),
      firstname,
      middlename,
      lastname,
      username,
      password: hashedPassword,
      user_level,
      email,
    };

    await User.create(newUser);
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

//@route GET /api/users
//@desc Get all users
//@access Public
const GETusers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

//@route GET /api/users/:id
//@desc Get a user by id
//@access Public
const GETuser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

//@route PUT /api/users/:id
//@desc Update a user by id
//@access Public
const PUTuser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password, user_level } = req.body;

  const existingUser = await User.findOne({ where: { id } });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const gensalt = 10;
  const hashedPassword = bcrypt.hashSync(password, gensalt);

  const updatedUser = {
    password: hashedPassword,
    user_level,
  };

  try {
    await User.update(updatedUser, { where: { id } });
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

//@route DELETE /api/users/:id
//@desc Delete a user by id
//@access Public
const DELETEuser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingUser = await User.findOne({ where: { id } });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    await User.destroy({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});
module.exports = { POSTuser, GETusers, GETuser, PUTuser, DELETEuser };
