import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Profile = () => {
  return (
    <Wrapper>
      <Header />
      <TitleHeader>Profile</TitleHeader>
      Enter Your Display Name
      <input type="text" />
      <div>Choose a Profile Picture</div>
      <div>Select 3 songs or artists that define you</div>
    </Wrapper>
  );
};

const TitleHeader = styled.h1`
  text-align: center;
  background-color: violet;
  padding: 15px;
`;

const Wrapper = styled.div`
  margin-top: 90px;
  height: 100vh;
`;

export default Profile;
