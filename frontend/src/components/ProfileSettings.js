import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProfileSettings = ({ setCurrentUserProfile, currentUserProfile }) => {
  const handleDeleteAccount = async () => {
    const deleteMessage =
      "Are you sure you want to delete your Social Bliss account? This will have no effect on your Spotify account and will only remove data associated with your Social Bliss account. Press OK to confirm.";
    let confirm = () => {
      return window.confirm(deleteMessage);
    };

    let response = confirm();

    if (response === true) {
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

      console.log(res);

      if (res.status === 200) {
        setCurrentUserProfile();
      }
    }
  };
  return (
    <Wrapper>
      <DeleteAccount onClick={handleDeleteAccount}>
        Delete your Social Bliss account
      </DeleteAccount>
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
`;
export default ProfileSettings;
