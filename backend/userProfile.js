const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "Please enter a display name"],
  },
  profilePicture: {
    type: String,
  },
  itemsToDisplay: {
    type: Array,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
