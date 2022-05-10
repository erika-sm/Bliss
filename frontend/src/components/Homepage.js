import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Recommendations from "./Recommendations";
import TopItems from "./TopItems";
import Profile from "./Profile";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

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
      ) : selectedTab === "recommendations" ? (
        <Recommendations />
      ) : (
        selectedTab === "profile" && <Profile />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export default Homepage;
