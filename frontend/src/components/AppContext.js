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
      highHue: 0,
      lowHue: 189,
      medHue: 295,
      defaultLightness: 45,
      colorRange: 1,
      lowSaturation: 100,
      highSaturation: 100,
      medSaturation: 100,
    },
    {
      name: "Target Danceability",
      min: 0,
      max: 1,
      step: 0.05,
      defaultValue: 0.5,
      highHue: 120,
      lowHue: 282,
      medHue: 105,
      defaultLightness: 45,
      colorRange: 1,
      lowSaturation: 45,
      highSaturation: 100,
      medSaturation: 42,
    },
    {
      name: "Target Acousticness",
      min: 0,
      max: 1,
      step: 0.05,
      defaultValue: 0.5,
      highHue: 39,
      lowHue: 209,
      medHue: 207,
      defaultLightness: 60,
      colorRange: 1,
      lowSaturation: 100,
      highSaturation: 100,
      medSaturation: 58,
    },
    {
      name: "Target Valence",
      min: 0,
      max: 1,
      step: 0.05,
      defaultValue: 0.5,
      highHue: 81,
      lowHue: 170,
      medHue: 165,
      defaultLightness: 60,
      colorRange: 1,
      lowSaturation: 50,
      highSaturation: 100,
      medSaturation: 89,
    },
    {
      name: "Target Tempo",
      min: 40,
      max: 240,
      step: 10,
      defaultValue: 140,
      highHue: 305,
      lowHue: 255,
      medHue: 255,
      defaultLightness: 50,
      colorRange: 1,
      lowSaturation: 77,
      highSaturation: 55,
      medSaturation: 55,
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
