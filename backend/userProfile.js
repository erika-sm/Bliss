const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "Please enter a display name"],
  },
  profilePicture: {
    type: String,
    required: true,
  },
  itemsToDisplay: {
    type: Array,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
});

userSchema.statics.getDetails = async function (username) {
  const user = await this.findOne({ username });

  if (user) {
    return user;
  } else {
    return "User not in database";
  }
};

const UserProfileVal = mongoose.model("users", userSchema);

module.exports = { UserProfileVal };
