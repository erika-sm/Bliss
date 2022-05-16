const assert = require("assert");
const { MongoClient } = require("mongodb");
const { users } = require("./userData");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImportUsers = async () => {
  try {
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("bliss");

    const result = await db.collection("users").insertMany(users);

    console.log("success");
  } catch (err) {
    console.log(err.message);
  }
};

batchImportUsers();
