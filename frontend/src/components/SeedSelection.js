import React, { useState, useContext, useEffect } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import { AppContext } from "./AppContext";

import PlayButton from "./PlayButton";

const SeedSelection = ({
  selectedItems,
  setSelectedItems,
  addItem,
  setAddItem,
}) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [loading, setLoading] = useState(false);
  const [topArtists, setTopArtists] = useState();

  console.log("text", selectedItems);

  const {
    accessToken,
    refreshToken,
    refresh,
    playing,
    setPlay,
    setTrackToPlay,
    trackToPlay,
    setPlaying,
  } = useContext(AppContext);

  const addSelectedItems = (e) => {
    if (selectedItems.length < 5) {
      let itemsArray = selectedItems;

      itemsArray.push(e);

      setSelectedItems(itemsArray);
    }
  };

  const removeSelectedItems = (e) => {
    console.log("remove");
    let itemsArray = selectedItems;

    const index = itemsArray.indexOf(e);

    if (index !== -1) {
      console.log(index);
      itemsArray.splice(index, 1);
      setSelectedItems(itemsArray);
    }
  };

  const fetchRecentlyPlayed = async () => {
    if (accessToken && refreshToken) {
      setLoading(true);
      const data = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=5",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const response = await data.json();
      console.log(response);

      if (response.error) {
        setLoading(true);
        await refresh();

        const data = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=5",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const newResponse = await data.json();
        setRecentlyPlayed(newResponse);
      } else setRecentlyPlayed(response);
    }
  };

  const fetchTopArtists = async () => {
    setLoading(true);
    if (accessToken && refreshToken) {
      console.log("hello");
      const data = await fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const json = await data.json();

      if (json.error) {
        setLoading(true);
        await refresh();

        const data = await fetch(
          `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const pushedData = await data.json();
        setTopArtists(pushedData);
      } else setTopArtists(json);
    }
  };

  useEffect(() => {
    fetchRecentlyPlayed();
    fetchTopArtists();
  }, [selectedItems]);
  return (
    <SeedWrapper>
      <Description>
        Search or select between 1 and 5 items from your top recently played
        tracks and artists. This will be the foundation of your recommendations.
      </Description>
      <SearchBarWrapper>
        {" "}
        <SearchBar
          addSelectedItems={addSelectedItems}
          setAddItem={setAddItem}
          addItem={addItem}
        />
      </SearchBarWrapper>
      <SelectionWrapper>
        <RecentPlays>
          <RecentlyRefresh>
            {" "}
            Recently Played{" "}
            <RefreshButton
              onClick={() => fetchRecentlyPlayed()}
              className="fa fa-refresh"
            ></RefreshButton>
          </RecentlyRefresh>
          {recentlyPlayed &&
            recentlyPlayed.items &&
            recentlyPlayed.items.map((item) => (
              <ItemWrapper
                key={item.track.id}
                onClick={() => {
                  if (selectedItems.includes(item)) {
                    removeSelectedItems(item);
                    setAddItem(!addItem);
                  } else {
                    addSelectedItems(item);
                    setAddItem(!addItem);
                  }
                }}
              >
                <Images
                  onClick={() => {
                    if (
                      playing === true &&
                      trackToPlay === `spotify:track:${item.track.id}`
                    ) {
                      setPlaying(false);
                    } else if (
                      trackToPlay === `spotify:track:${item.track.id}` &&
                      !playing
                    ) {
                      setPlaying(true);
                    } else {
                      setTrackToPlay(`spotify:track:${item.track.id}`);
                    }
                  }}
                  src={item.track.album.images[2].url}
                />
                <ItemNames>
                  <div>{item.track.name}</div>
                  <div>{item.track.artists[0].name}</div>
                </ItemNames>
              </ItemWrapper>
            ))}
        </RecentPlays>
        <TopArtists>
          Recent Top Artists
          {topArtists &&
            topArtists.items.map((item) => (
              <ItemWrapper
                key={item.id}
                onClick={() => {
                  if (selectedItems.includes(item)) {
                    removeSelectedItems(item);
                    setAddItem(!addItem);
                  } else {
                    addSelectedItems(item);
                    setAddItem(!addItem);
                  }
                }}
              >
                <Images src={item.images[2].url} />
                <ArtistNames>
                  <div>{item.name}</div>
                </ArtistNames>
              </ItemWrapper>
            ))}
        </TopArtists>
      </SelectionWrapper>

      <Selections>Selections</Selections>
      <SelectedItems>
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
        {selectedItems.length > 0 && (
          <div style={{ fontSize: "11px" }}>
            Move to the next page once you've completed your selections!
          </div>
        )}
      </SelectedItems>
    </SeedWrapper>
  );
};

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

export default SeedSelection;
