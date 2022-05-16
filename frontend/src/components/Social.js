import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Header from "./Header";
import { AppContext } from "./AppContext";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import ProfileCreate from "./ProfileCreate";
import UserProfile from "./UserProfile";

const Social = () => {
  const { currentUser } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();

  const getUser = async () => {
    const fetchUser = await fetch(`/api/get-user/${currentUser}`);
    const user = await fetchUser.json();

    if (user.status === 200) {
      setUserProfile(user.data);
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);
  return (
    <Wrapper>
      <Header />
      <TitleHeader>Social bliss</TitleHeader>

      {!userProfile ? (
        <ProfileCreate setUserProfile={setUserProfile} />
      ) : (
        <UserProfile userProfile={userProfile} currentUser={currentUser} />
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
  height: 80vh;
`;

export default Social;
