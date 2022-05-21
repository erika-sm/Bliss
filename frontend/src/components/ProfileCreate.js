import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { AppContext } from "./AppContext";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";

const ProfileCreate = ({ setCurrentUserProfile, setSelectedTab }) => {
  const { currentUser } = useContext(AppContext);
  const [image, setImage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [addItem, setAddItem] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [creatingProfile, setCreatingProfile] = useState(false);

  const [userDetails, setUserDetails] = useState({
    displayName: "",
    profilePicture: "",
    itemsToDisplay: [],
    username: currentUser,
    followers: [],
    following: [],
  });

  const removeSelectedItems = (e) => {
    let itemsArray = selectedItems;

    const index = itemsArray.indexOf(e);

    if (index !== -1) {
      itemsArray.splice(index, 1);

      let items = itemsArray;
      const ids = items.map((item) => {
        return { [item.type]: item.id };
      });

      setUserDetails({ ...userDetails, itemsToDisplay: ids });

      setSelectedItems(itemsArray);
    }
  };

  const addSelectedItems = (e) => {
    if (selectedItems.length < 3) {
      let itemsArray = selectedItems;

      itemsArray.push(e);

      let items = itemsArray;
      const ids = items.map((item) => {
        return { [item.type]: item.id };
      });

      setUserDetails({ ...userDetails, itemsToDisplay: ids });

      setSelectedItems(itemsArray);
    }
  };

  const uploadProfilePic = async (e) => {
    const imgFile = e.target.files;
    const data = new FormData();
    data.append("file", imgFile[0]);
    data.append("upload_preset", "blissProfilePics");
    setLoading(true);
    const uploadPic = await fetch(
      "https://api.cloudinary.com/v1_1/dymidbhrb/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const picture = await uploadPic.json();

    setImage(picture.secure_url);
    setUserDetails({ ...userDetails, profilePicture: picture.secure_url });

    setLoading(false);
  };

  const createUser = async () => {
    setCreatingProfile(true);
    const createUser = await fetch("/api/create-profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const userFetch = await createUser.json();

    if (userFetch.status === 400) {
      setError("Please select 3 tracks and/or artists");
      setCreatingProfile(false);
    } else {
      setCurrentUserProfile(userFetch.data);
      setSelectedTab("myProfile");
      setCreatingProfile(false);
    }
  };

  const handleProfileCreation = (e) => {
    e.preventDefault();
    createUser();
  };
  return (
    <Wrapper>
      <Form onSubmit={handleProfileCreation}>
        <ItemContainer>
          <div>Enter a display name</div>
          <Input
            required
            type="text"
            value={userDetails.displayName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, displayName: e.target.value })
            }
          />
        </ItemContainer>
        <ItemContainer>
          <div>Upload a profile picture </div>
          <input
            required
            type="file"
            name="file"
            placeholder="Upload a profile picture"
            onChange={uploadProfilePic}
          />
          {loading ? (
            <LoadingWrapper>
              <LoadingSpinner />
            </LoadingWrapper>
          ) : (
            !loading &&
            image && (
              <div>
                <RemoveItem
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    setImage();
                    setUserDetails({
                      ...userDetails,
                      profilePicture: "",
                    });
                  }}
                >
                  Remove
                </RemoveItem>
                <div>
                  <ProfilePic src={image} />
                </div>
              </div>
            )
          )}
        </ItemContainer>
        <SearchContainer>
          <div>
            Select the 3 songs or artists that you're feeling the most at the
            moment
          </div>
          <Search onChange={() => setError()}>
            <SearchBar
              selectedItems={selectedItems}
              addSelectedItems={addSelectedItems}
              setAddItem={setAddItem}
              addItem={addItem}
            />
          </Search>
          {selectedItems &&
            selectedItems.map((item) =>
              item.track ? (
                <ListItem>
                  <List>{item.track.name}</List>{" "}
                  <RemoveItem
                    onClick={() => {
                      removeSelectedItems(item);
                      setAddItem(!addItem);
                    }}
                  >
                    (Remove)
                  </RemoveItem>
                </ListItem>
              ) : (
                <ListItem>
                  <List>{item.name}</List>{" "}
                  <RemoveItem
                    onClick={() => {
                      removeSelectedItems(item);
                      setAddItem(!addItem);
                    }}
                  >
                    (Remove)
                  </RemoveItem>
                </ListItem>
              )
            )}
          <Error>{error}</Error>
        </SearchContainer>
        {selectedItems.length === 3 && <SubmitButton>Submit</SubmitButton>}
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  overflow: auto;
  height: 70vh;
  width: 100vw;
`;

const ProfilePic = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const RemoveItem = styled.div`
  color: red;
  font-size: 11px;
  text-align: right;
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

const ListItem = styled.ul`
  display: flex;
`;

const Input = styled.input`
  width: 50vw;
`;

const List = styled.div`
  width: 250px;
  margin-bottom: -10px;
`;

const SearchContainer = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;
`;

const Search = styled.div`
  position: relative;
  left: 60%;
  transform: translateX(-50%);
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 50vh;
`;

const ItemContainer = styled.div`
  margin-bottom: 35px;
`;

const LoadingWrapper = styled.div``;

export default ProfileCreate;
