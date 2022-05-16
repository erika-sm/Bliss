const { MongoClient } = require("mongodb");
const { UserProfileVal } = require("./userProfile");

require("dotenv").config();

const { MONGO_URI } = process.env;

const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  const username = req.params.username;

  mongoose.connect(MONGO_URI, options);

  const user = await UserProfileVal.getDetails(username);

  if (user !== "User not in database") {
    res.status(200).json({
      status: 200,
      data: user,
      message: "User information successfully retrieved",
    });
  } else {
    res.status(404).json({ status: 404, message: "User not found" });
  }
};

const createUserProfile = async (req, res) => {
  const { displayName, profilePicture, itemsToDisplay, username } = req.body;

  console.log(req.body);

  try {
    mongoose.connect(MONGO_URI, options);
    const createUser = await UserProfileVal.create({
      displayName,
      profilePicture,
      itemsToDisplay,
      username,
    });

    console.log(createUser);

    res.status(200).json({
      status: 200,
      data: createUser,
      message: "Profile successfully created!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      error: "Profile could not be created. Please try again!",
    });
  }
};

module.exports = {
  getUser,
  createUserProfile,
};
