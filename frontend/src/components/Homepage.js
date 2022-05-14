import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Discover from "./Discover";
import TopItems from "./TopItems";
import Profile from "./Profile";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import Player from "./Player";

const Homepage = () => {
  const { selectedTab } = useContext(AppContext);

  let redirect = useNavigate();

  useEffect(async () => {
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    if (parsedToken.message === "undefined access token") {
      redirect("/");
    }
  }, []);
  return (
    <Wrapper>
      {selectedTab === "topItems" ? (
        <TopItems />
      ) : selectedTab === "discover" ? (
        <Discover />
      ) : (
        selectedTab === "profile" && <Profile />
      )}
      <Player />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 50vh;
`;

export default Homepage;
