import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const FollowsPage = ({ follows }) => {
  const [followsList, setFollowsList] = useState([]);
  const [loading, setLoading] = useState();

  const fetchFollow = async () => {
    setLoading(true);
    const followsData = await Promise.all(
      follows.map(async (user) => {
        return await fetch(`/api/get-user-by-id/${user}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            return res.data;
          });
      })
    );

    setFollowsList(followsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFollow();
  }, [follows]);

  return (
    <Wrapper>
      {loading ? (
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      ) : (
        !loading &&
        followsList.length > 0 && (
          <AllUsersWrapper>
            {followsList.map((user) => (
              <UserContainer key={user._id}>
                <ProfilePicture src={user.profilePicture} />
                <DisplayName>{user.displayName}</DisplayName>
              </UserContainer>
            ))}
          </AllUsersWrapper>
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const AllUsersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
  height: 60vh;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  border: solid;
  border-color: grey;
`;

const DisplayName = styled.p``;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 5px;

  &:hover {
    cursor: pointer;
  }
`;

export default FollowsPage;
