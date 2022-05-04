import React, { useContext } from "react";
import styled from "styled-components";
import Recommendations from "./Recommendations";
import TopItems from "./TopItems";
import Profile from "./Profile";
import { AppContext } from "./AppContext";

const Homepage = () => {
  const { selectedTab } = useContext(AppContext);
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
