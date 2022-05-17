import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { AppContext } from "./AppContext";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";

const ProfileCreate = () => {
  const { currentUser } = useContext(AppContext);
  const [image, setImage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [addItem, setAddItem] = useState();
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    displayName: "",
    profilePicture: "",
    itemsToDisplay: "",
    username: currentUser,
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

    console.log(picture);

    setImage(picture.secure_url);
    setUserDetails({ ...userDetails, profilePicture: picture.secure_url });

    setLoading(false);
  };

  const createUser = async () => {
    const createUser = await fetch("/api/create-profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const userFetch = await createUser.json();

    console.log(userFetch);
  };

  const handleProfileCreation = (e) => {
    e.preventDefault();
    createUser();
  };
  return (
    <Wrapper>
      <form onSubmit={handleProfileCreation}>
        Enter a display name
        <input
          required
          type="text"
          value={userDetails.displayName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, displayName: e.target.value })
          }
        />
        <div>
          <div>Upload a profile picture </div>
          <input
            required
            type="file"
            name="file"
            placeholder="Upload a profile picture"
            onChange={uploadProfilePic}
          />
          {loading ? (
            <LoadingSpinner />
          ) : (
            !loading &&
            image && (
              <div>
                <div
                  onClick={() => {
                    setImage();
                    setUserDetails({
                      ...userDetails,
                      profilePicture: "",
                    });
                  }}
                >
                  X
                </div>
                <ProfilePic src={image} />
              </div>
            )
          )}
        </div>
        <div>
          Select the 3 songs or artists that you're feeling the most at the
          moment
        </div>
        <SearchBar
          selectedItems={selectedItems}
          addSelectedItems={addSelectedItems}
          setAddItem={setAddItem}
          addItem={addItem}
        />
        <ol>
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
        </ol>
        <button>Submit</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ProfilePic = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const SeedWrapper = styled.div`
  text-align: center;
  font-size: 14px;
`;

const Description = styled.p``;

const SelectionWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: space-around;
  margin-left: 20px;
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const RecentPlays = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopArtists = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
`;

const SelectedItems = styled.div`
  position: absolute;
  left: 47%;
  transform: translateX(-50%);
  margin-top: -20px;
  text-align: left;
  display: block;
  overflow: auto;
  height: 75px;
`;

const Selections = styled.h3`
  border-top: solid;
  border-bottom: solid;
  border-color: white;
`;

const Images = styled.img`
  height: 50px;
  width: 50px;
`;

const RecentlyRefresh = styled.div`
  display: flex;
`;

const ItemWrapper = styled.div`
  display: flex;
  font-size: 11px;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ItemNames = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  width: 125px;
`;

const ArtistNames = styled.div`
  margin-top: 20px;
  margin-left: 5px;
  font-size: 12px;
`;

const RefreshButton = styled.i`
  margin-left: 5px;

  &:active {
    transform: rotate(90deg) scale(1.2);
  }
`;

const RemoveItem = styled.div`
  color: red;

  font-size: 11px;
  text-align: right;
`;

const ListItem = styled.div`
  display: flex;
`;

const List = styled.li`
  width: 250px;
`;

export default ProfileCreate;
