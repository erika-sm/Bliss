import React, { createContext, useState, useEffect } from "react";
import moment from "moment";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  let currentTime = moment().format("HH");
  const [greeting, setGreeting] = useState();

  console.log(currentTime);

  useEffect(() => {
    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("Good morning");
    } else if (currentTime >= 12 && currentTime < 17) {
      setGreeting("Good afternoon");
    } else if (currentTime >= 17 || currentTime < 5) {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <AppContext.Provider value={{ currentTime, greeting }}>
      {children}
    </AppContext.Provider>
  );
};
