import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Header from "./Header";
import { AppContext } from "./AppContext";

import ProfileCreate from "./ProfileCreate";
import SocialHeader from "./SocialHeader";
import AllUsers from "./AllUsers";
import ProfileSettings from "./ProfileSettings";
import MyProfile from "./MyProfile";
import LoadingSpinner from "./LoadingSpinner";

const Social = () => {
  const { currentUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [selectedTab, setSelectedTab] = useState("myProfile");
  const [currentUserProfile, setCurrentUserProfile] = useState();
  const [selectedUser, setSelectedUser] = useState(false);
  const getUser = async () => {
    setLoading(true);
    const fetchUser = await fetch(`/api/get-user/${currentUser}`);
    const user = await fetchUser.json();

    if (user.status === 200) {
      setLoading(false);
      setCurrentUserProfile(user.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

  return (
    <Wrapper>
      <Header />
      <TitleHeader>Social Bliss</TitleHeader>

      {loading ? (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />{" "}
        </LoadingSpinnerWrapper>
      ) : !currentUserProfile ? (
        <ProfileCreate
          setCurrentUserProfile={setCurrentUserProfile}
          setSelectedTab={setSelectedTab}
        />
      ) : selectedTab === "myProfile" ? (
        <>
          <SocialHeader
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <MyProfile
            currentUser={currentUser}
            currentUserProfile={currentUserProfile}
          />
        </>
      ) : selectedTab === "allUsers" ? (
        <>
          {" "}
          <SocialHeader
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            setSelectedUser={setSelectedUser}
          />
          <AllUsers
            currentUser={currentUser}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
            currentUserProfile={currentUserProfile}
            setCurrentUserProfile={setCurrentUserProfile}
          />
        </>
      ) : (
        selectedTab === "settings" && (
          <>
            <SocialHeader
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <ProfileSettings
              setCurrentUserProfile={setCurrentUserProfile}
              currentUserProfile={currentUserProfile}
            />
          </>
        )
      )}
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
  height: 78vh;
`;

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
`;

export default Social;
