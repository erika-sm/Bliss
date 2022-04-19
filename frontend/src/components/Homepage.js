import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components";

const Homepage = () => {
  const [timeRange, setTimeRange] = useState("short_term");
  const [topItems, setTopItems] = useState("");
  const [item, setItem] = useState("artists");
  const [loading, setLoading] = useState(false);
  const { greeting } = useContext(AppContext);

  const getTopItems = async () => {
    setLoading(true);
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    const data = await fetch(
      `https://api.spotify.com/v1/me/top/${item}?time_range=${timeRange}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken.data.access_token}`,
        },
      }
    );

    const json = await data.json();

    setTopItems(json);

    setLoading(false);
  };

  useEffect(() => {
    getTopItems();
  }, [timeRange, item]);

  return (
    <div>
      <GreetingsBanner>{greeting}</GreetingsBanner>
      Your top{" "}
      <Select
        onChange={(e) => {
          setItem(e.target.value);
          setTopItems("");
        }}
      >
        {" "}
        <option value={"artists"}>Artists</option>{" "}
        <option value={"tracks"}>Tracks</option>
      </Select>{" "}
      of
      <Select onChange={(e) => setTimeRange(e.target.value)}>
        <option value={"short_term"}>the last 4 weeks</option>
        <option value={"medium_term"}>the last 6 months</option>
        <option value={"long_term"}>all time</option>
      </Select>
      {loading ? (
        <div>loading</div>
      ) : topItems.items && item === "tracks" ? (
        <>
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
            <img alt="Artist image" src={artist.images[2].url} /> {artist.name}{" "}
          </TopArtists>
        ))
      )}
    </div>
  );
};

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
`;

export default Homepage;
