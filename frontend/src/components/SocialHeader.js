import React from "react";
import styled from "styled-components";

const SocialHeader = ({
  selectedTab,
  setSelectedTab,
  setSelectedUser,
  setViewFollows,
}) => {
  return (
    <Header>
      <PageSelection>
        <PageTab
          style={{ borderBottom: selectedTab === "myProfile" && "solid" }}
          onClick={() => {
            setSelectedTab("myProfile");
            setSelectedUser(false);
            setViewFollows(false);
          }}
        >
          My Profile
        </PageTab>{" "}
        <PageTab
          style={{ borderBottom: selectedTab === "allUsers" && "solid" }}
          onClick={() => {
            setSelectedTab("allUsers");
            setSelectedUser(false);
            setViewFollows(false);
          }}
        >
          {" "}
          All Users
        </PageTab>{" "}
        <PageTab
          style={{ borderBottom: selectedTab === "settings" && "solid" }}
          onClick={() => {
            setSelectedTab("settings");
            setSelectedUser(false);
            setViewFollows(false);
          }}
        >
          Settings
        </PageTab>
      </PageSelection>
    </Header>
  );
};

const Header = styled.div``;

const PageSelection = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
`;

const PageTab = styled.div`
  height: 20px;
  margin-top: -10px;
  margin-right: 15px;
  border-color: white;

  &:hover {
    border-bottom: solid;
    border-color: white;
  }
`;

export default SocialHeader;
