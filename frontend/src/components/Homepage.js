import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import PlaylistModal from "./PlaylistModal";

const Homepage = () => {
  const [timeRange, setTimeRange] = useState("short_term");
  const [topItems, setTopItems] = useState("");
  const [item, setItem] = useState("artists");
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState([]);

  console.log(topItems);

  const { greeting, itemLimit, setCreatingPlaylist, creatingPlaylist } =
    useContext(AppContext);

  const getTopItems = async () => {
    setLoading(true);
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    const data = await fetch(
      `https://api.spotify.com/v1/me/top/${item}?time_range=${timeRange}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken.data.access_token}`,
        },
      }
    );

    const json = await data.json();

    setTopItems(json);

    let items = json.items;

    let idArray = items.map((item) => {
      return `spotify:track:${item.id}`;
    });

    setItemId(idArray);

    setLoading(false);
  };

  useEffect(() => {
    getTopItems();
  }, [timeRange, item, limit]);

  return (
    <div>
      <PlaylistModal itemId={itemId} />
      <Wrapper>
        <GreetingsBanner>{greeting}</GreetingsBanner>
        Your top{" "}
        <Select onChange={(e) => setLimit(e.target.value)} defaultValue={20}>
          {itemLimit.map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </Select>
        <Select
          onChange={(e) => {
            setItem(e.target.value);
            setTopItems("");
          }}
        >
          {" "}
          <option value={"artists"}>artists</option>{" "}
          <option value={"tracks"}>tracks</option>
        </Select>{" "}
        of
        <Select onChange={(e) => setTimeRange(e.target.value)}>
          <option value={"short_term"}>the last 4 weeks</option>
          <option value={"medium_term"}>the last 6 months</option>
          <option value={"long_term"}>all time</option>
        </Select>
        {loading ? (
          <SpinnerWrapper>
            <LoadingSpinner />
          </SpinnerWrapper>
        ) : topItems.items && item === "tracks" ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCreatingPlaylist(true);
              }}
            >
              Create playlist
            </button>

            {topItems.items.map((track) => (
              <TopTracks key={track.id}>
                <img alt="Album cover" src={track.album.images[2].url} />
                {track.name} - {track.artists[0].name}
              </TopTracks>
            ))}
          </>
        ) : (
          topItems.items &&
          item === "artists" &&
          topItems.items.map((artist) => (
            <TopArtists key={artist.id}>
              {" "}
              <img alt="Artist image" src={artist.images[2].url} />{" "}
              {artist.name}{" "}
            </TopArtists>
          ))
        )}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const TopArtists = styled.div``;
const TopTracks = styled.div``;

const GreetingsBanner = styled.div`
  background-image: linear-gradient(to bottom right, purple, black 80%);
  height: 5vh;
  font-size: 25px;
  padding: 0;
`;

const Select = styled.select`
  background-color: black;
  color: white;
  border: none;
  margin-right: 5px;
  margin-left: 5px;
  font-size: 15px;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
`;

export default Homepage;
