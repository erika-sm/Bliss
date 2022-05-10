const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

let token;

router.get("/api/login", (req, res) => {
  let params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope:
      "user-top-read, playlist-modify-public, playlist-modify-private, user-read-recently-played",
  }).toString();

  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

router.get("/api/callback", async (req, res) => {
  const { code } = req.query;
  const clientId = CLIENT_ID;
  const secret = CLIENT_SECRET;
  const redirect_uri = REDIRECT_URI;
  const grant_type = "authorization_code";

  const params = new URLSearchParams({
    grant_type,
    code,
    redirect_uri,
  }).toString();

  const basicHeader = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const data = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  token = await data.json();

  return res.redirect("/homepage");
});

router.get("/api/token", (req, res) => {
  if (token !== undefined) {
    res
      .status(200)
      .json({ data: token, message: "token successfully retrieved" });
  } else res.status(400).json({ message: "undefined access token" });
});

router.get("/api/refreshToken", async (req, res) => {
  const query = req.query;
  const refresh_token = query.refresh;
  const clientId = CLIENT_ID;
  const secret = CLIENT_SECRET;
  const grant_type = "refresh_token";

  const params = new URLSearchParams({
    grant_type,
    refresh_token,
  }).toString();

  const basicHeader = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const data = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  let refreshToken = await data.json();

  if (!refreshToken.error) {
    res.status(200).json({
      data: refreshToken,
      message: "refresh token successfully retrieved",
    });
  } else res.status(400).json({ message: "undefined refresh token" });
});

module.exports = router;
