import React, { createContext, useState, useEffect } from "react";
import moment from "moment";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  let currentTime = moment().format("HH");
  const [greeting, setGreeting] = useState();
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const recommendationSliderArray = [
    {
      name: "Target Energy",
      min: 0,
      max: 1,
      step: 0.05,
      defaultValue: 0.5,
      hue: 115,
      defaultLightness: 40,
      colorRange: 1,
    },
    {
      name: "Target Danceability",
      min: 0,
      max: 1,
      step: 0.05,
      defaultValue: 0.5,
      hue: 180,
      defaultLightness: 45,
      colorRange: 1,
    },
    {
      name: "Target Acousticness",
      min: 0,
      max: 1,
      step: 0.05,
      defaultValue: 0.5,
      hue: 35,
      defaultLightness: 55,
      colorRange: 1,
    },
    {
      name: "Target Valence",
      min: 0,
      max: 1,
      step: 0.05,
      hue: 307,
      defaultLightness: 45,
      colorRange: 1,
    },
    {
      name: "Target Tempo",
      min: 0,
      max: 1,
      step: 0.05,
      defaultValue: 0.5,
      hue: 254,
      defaultLightness: 50,
      colorRange: 1,
    },
  ];

  const getCurrentUser = async () => {
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    const userData = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.data.access_token}`,
      },
    });

    const userJson = await userData.json();

    setCurrentUser(userJson.id);
  };

  useEffect(() => {
    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("Good morning");
    } else if (currentTime >= 12 && currentTime < 17) {
      setGreeting("Good afternoon");
    } else if (currentTime >= 17 || currentTime < 5) {
      setGreeting("Good evening");
    }

    getCurrentUser();
  }, []);

  let itemLimit = [];

  for (let i = 1; i <= 50; i++) {
    itemLimit.push(i);
  }

  const createPlaylist = async (currentUser, initialData, playlistTrackIds) => {
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    const playlistData = await fetch(
      `https://api.spotify.com/v1/users/${currentUser}/playlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken.data.access_token}`,
        },
        body: JSON.stringify(initialData),
      }
    );

    const response = await playlistData.json();

    const addTracks = await fetch(
      `https://api.spotify.com/v1/playlists/${response.id}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken.data.access_token}`,
        },
        body: JSON.stringify(playlistTrackIds),
      }
    );

    const tracksResponse = await addTracks.json();

    console.log(tracksResponse);
  };

  return (
    <AppContext.Provider
      value={{
        currentTime,
        greeting,
        itemLimit,
        creatingPlaylist,
        setCreatingPlaylist,
        currentUser,
        createPlaylist,
        recommendationSliderArray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
