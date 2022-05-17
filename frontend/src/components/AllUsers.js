import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import UserProfile from "./UserProfile";

const AllUsers = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const getUsers = async () => {
    setLoading(true);
    const fetchUsers = await fetch("/api/get-all-users");
    const userList = await fetchUsers.json();

    setUsers(userList.data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      ) : !loading && users.length > 0 && !selectedUser ? (
        <AllUsersWrapper>
          {users.map((user) => (
            <UserContainer
              onClick={() => {
                setUserProfile(user);
                setSelectedUser(true);
              }}
            >
              <ProfilePicture src={user.profilePicture} />
              <DisplayName>{user.displayName}</DisplayName>
            </UserContainer>
          ))}
        </AllUsersWrapper>
      ) : (
        selectedUser && <UserProfile userProfile={userProfile} />
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
export default AllUsers;
