const express = require("express");
const morgan = require("morgan");
const hpp = require("hpp");
const session = require("cookie-session");
const csurf = require("csurf");
const helmet = require("helmet");

const { generateRandomString } = require("./cookieGen");
const {
  getUser,
  createUserProfile,
  getAllUsers,
  deleteUser,
  editUser,
  followUser,
  unfollowUser,
  findLyrics,
  getUserById,
} = require("./handlers");

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(require("./authentication"));

app.use(
  session({
    name: "session",
    secret: generateRandomString(16),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  })
);

app.get("/api/get-user/:username", getUser);
app.post("/api/create-profile", createUserProfile);
app.get("/api/get-all-users", getAllUsers);
app.delete("/api/delete-user/:_id", deleteUser);
app.patch("/api/edit-user", editUser);
app.patch("/api/follow-user", followUser);
app.patch("/api/unfollow-user", unfollowUser);
app.get("/api/lyrics", findLyrics);
app.get("/api/get-user-by-id/:_id", getUserById);

app.use(csurf());

app.listen(8888, () => {
  console.log("Listening on port 8888");
});
