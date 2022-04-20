import React, { createContext, useState, useEffect } from "react";
import moment from "moment";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  let currentTime = moment().format("HH");
  const [greeting, setGreeting] = useState();
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [currentUser, setCurrentUser] = useState();

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

    const data = await fetch(
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
