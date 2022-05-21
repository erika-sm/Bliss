import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const ProfileSettings = ({ setCurrentUserProfile, currentUserProfile }) => {
  const [loading, setLoading] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    const deleteUser = await fetch(
      `/api/delete-user/${currentUserProfile._id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const res = await deleteUser.json();

    if (res.status === 200) {
      setCurrentUserProfile();
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      {loading ? (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      ) : deleteAccount ? (
        <DeleteWrapper>
          <p>
            {" "}
            Are you sure you want to delete your Social Bliss account? This will
            have no effect on your Spotify account and will only remove data
            associated with your Social Bliss account. Press Yes to confirm.
          </p>
          <ButtonWrapper>
            <No onClick={() => setDeleteAccount(false)}>No</No>{" "}
            <Yes onClick={() => handleDeleteAccount()}>Yes</Yes>
          </ButtonWrapper>
        </DeleteWrapper>
      ) : (
        <DeleteAccount onClick={() => setDeleteAccount(true)}>
          Delete your Social Bliss account
        </DeleteAccount>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const DeleteAccount = styled.button`
  text-align: center;
  color: red;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  background: black;
  border: none;
  font-size: 16px;
`;

const Yes = styled.button`
  color: red;
  width: 100px;
`;

const No = styled.button`
  width: 100px;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
`;

const DeleteWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;
export default ProfileSettings;
