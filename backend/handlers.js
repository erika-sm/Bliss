const { MongoClient } = require("mongodb");
const { UserProfileVal } = require("./userProfile");
const ObjectId = require("mongodb").ObjectId;
const lyricsSearcher = require("lyrics-searcher");

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
  const {
    displayName,
    profilePicture,
    itemsToDisplay,
    username,
    followers,
    following,
  } = req.body;

  try {
    mongoose.connect(MONGO_URI, options);
    const createUser = await UserProfileVal.create({
      displayName,
      profilePicture,
      itemsToDisplay,
      username,
      followers,
      following,
    });

    res.status(200).json({
      status: 200,
      data: createUser,
      message: "Profile successfully created!",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      error: "Profile could not be created. Please try again!",
    });
  }
};

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("bliss");
  const result = await db.collection("users").find().toArray();

  if (result.length > 0) {
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully retrieved all users.",
    });
  } else {
    return res.status(404).json({
      status: 404,
      message: `Unable to retrieve list of users.`,
    });
  }
};

const deleteUser = async (req, res) => {
  const _id = req.params._id;
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("bliss");

  const userId = await db.collection("users").findOne({ _id: ObjectId(_id) });

  if (userId) {
    await db.collection("users").deleteOne({ _id: ObjectId(_id) });

    res.status(200).json({ status: 200, message: "User successfully deleted" });
  } else {
    res.status(404).json({ status: 404, message: "User could not be found " });
  }
};

const editUser = async (req, res) => {
  const itemsToUpdate = req.body;

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("bliss");

  const update = await db
    .collection("users")
    .updateOne(
      { _id: ObjectId(itemsToUpdate._id) },
      { $set: { displayName: itemsToUpdate.displayName } }
    );
  if (update.modifiedCount !== 0) {
    res.status(200).json({
      message: "User information successfully updated.",
      data: itemsToUpdate,
    });
  } else
    res.state(400).json({
      message: "Unable to update user information.",
      data: itemsToUpdate,
    });
};

const followUser = async (req, res) => {
  const { userToFollow, currentUser } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("bliss");

  const updateFollowing = await db
    .collection("users")
    .updateOne(
      { _id: ObjectId(currentUser) },
      { $push: { following: ObjectId(userToFollow) } }
    );

  if (updateFollowing.modifiedCount !== 0) {
    const updateFollowers = await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(userToFollow) },
        { $push: { followers: ObjectId(currentUser) } }
      );
    if (updateFollowers.modifiedCount !== 0) {
      res.status(200).json({
        status: 200,
        message: "User successfully followed",
        data: userToFollow,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Could not follow user",
        data: userToFollow,
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      message: "Could not follow user",
      data: userToFollow,
    });
  }
};

const unfollowUser = async (req, res) => {
  const { userToUnfollow, currentUser } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("bliss");

  const updateFollowing = await db
    .collection("users")
    .updateOne(
      { _id: ObjectId(currentUser) },
      { $pull: { following: ObjectId(userToUnfollow) } }
    );

  if (updateFollowing.modifiedCount !== 0) {
    const updateFollowers = await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(userToUnfollow) },
        { $pull: { followers: ObjectId(currentUser) } }
      );
    if (updateFollowers.modifiedCount !== 0) {
      res.status(200).json({
        status: 200,
        message: "User successfully followed",
        data: userToUnfollow,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Could not follow user",
        data: userToUnfollow,
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      message: "Could not follow user",
      data: userToUnfollow,
    });
  }
};

const findLyrics = async (req, res) => {
  const artist = req.query.artist;
  const track = req.query.track;

  const lyrics = await lyricsSearcher(artist, track);

  if (lyrics) {
    res.status(200).json({
      status: 200,
      message: "Lyrics successfully found",
      data: lyrics,
    });
  } else {
    res
      .status(404)
      .json({ status: 404, message: "No matching lyrics found. " });
  }
};

const getUserById = async (req, res) => {
  const _id = req.params._id;
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("bliss");

  const user = await db.collection("users").findOne({ _id: ObjectId(_id) });

  if (user) {
    res.status(200).json({
      status: 200,
      data: user,
      message: "User information successfully retrieved",
    });
  } else {
    res.status(404).json({ status: 404, message: "User not found" });
  }
};
module.exports = {
  getUser,
  createUserProfile,
  getAllUsers,
  deleteUser,
  editUser,
  followUser,
  unfollowUser,
  findLyrics,
  getUserById,
};
