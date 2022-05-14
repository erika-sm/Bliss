import React, { createContext, useState, useEffect } from "react";
import moment from "moment";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  let currentTime = moment().format("HH");
  const [greeting, setGreeting] = useState();
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [selectedTab, setSelectedTab] = useState("topItems");
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [trackToPlay, setTrackToPlay] = useState();
  const [playing, setPlaying] = useState(false);

  useEffect(async () => {
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    setAccessToken(parsedToken.data.access_token);
    setRefreshToken(parsedToken.data.refresh_token);
  }, []);

  const refresh = async () => {
    const refreshT = await fetch(`/api/refreshToken/?refresh=${refreshToken}`);
    const refreshedToken = await refreshT.json();
    console.log(refreshedToken);
    setAccessToken(refreshedToken.data.access_token);
  };

  const recommendationSliderArray = [
    {
      name: "Energy",
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
      description:
        "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. ",
    },
    {
      name: "Danceability",
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
      description:
        "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
    },
    {
      name: "Acousticness",
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
      description:
        "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
    },
    {
      name: "Valence",
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
      description:
        "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
    },
    {
      name: "Tempo",
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
      description:
        "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.",
    },
  ];

  const getCurrentUser = async () => {
    const userData = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userJson = await userData.json();

    if (userJson.error) {
      await refresh();

      const userData = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userJson = await userData.json();

      setCurrentUser(userJson.id);
    } else {
      setCurrentUser(userJson.id);
    }
  };

  useEffect(() => {
    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("Good morning");
    } else if (currentTime >= 12 && currentTime < 17) {
      setGreeting("Good afternoon");
    } else if (currentTime >= 17 || currentTime < 5) {
      setGreeting("Good evening");
    }
  }, [accessToken]);

  useEffect(() => {
    getCurrentUser();
  }, [accessToken]);

  let itemLimit = [];

  for (let i = 1; i <= 50; i++) {
    itemLimit.push(i);
  }

  const createPlaylist = async (currentUser, initialData, playlistTrackIds) => {
    const playlistData = await fetch(
      `https://api.spotify.com/v1/users/${currentUser}/playlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(initialData),
      }
    );

    let response = await playlistData.json();

    if (response.error) {
      const playlistData = await fetch(
        `https://api.spotify.com/v1/users/${currentUser}/playlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(initialData),
        }
      );

      response = await playlistData.json();
    }

    await fetch(`https://api.spotify.com/v1/playlists/${response.id}/tracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(playlistTrackIds),
    });
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
        selectedTab,
        setSelectedTab,
        accessToken,
        refresh,
        refreshToken,
        trackToPlay,
        setTrackToPlay,
        trackToPlay,
        setTrackToPlay,
        playing,
        setPlaying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
