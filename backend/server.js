const express = require("express");
const morgan = require("morgan");
const hpp = require("hpp");
const session = require("cookie-session");
const csurf = require("csurf");
const helmet = require("helmet");
var cors = require("cors");
const { generateRandomString } = require("./cookieGen");

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(require("./authentication"));
app.use(cors());

app.use(
  session({
    name: "session",
    secret: generateRandomString(16),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  })
);

app.use(csurf());

app.listen(8888, () => {
  console.log("Listening on port 8888");
});
