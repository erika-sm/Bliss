import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Profile = () => {
  return (
    <Wrapper>
      <Header /> <div>Profile</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 90px;
`;

export default Profile;
