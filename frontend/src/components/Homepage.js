import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components";

const Homepage = () => {
  const [timeRange, setTimeRange] = useState("medium_term");
  const [topItems, setTopItems] = useState("");
  const [item, setItem] = useState("tracks");
  const { greeting } = useContext(AppContext);

  const getTopItems = async () => {
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
  };

  useEffect(() => {
    getTopItems();
  }, [timeRange, item]);

  console.log(topItems);

  return (
    <div>
      <GreetingsBanner>{greeting}</GreetingsBanner>
      {topItems.items && (
        <>
          Your top{" "}
          <select
            defaultValue={"tracks"}
            onChange={(e) => setItem(e.target.value)}
          >
            {" "}
            <option value={"artists"}>Artists</option>{" "}
            <option value={"tracks"}>Tracks</option>
          </select>{" "}
          of
          <select
            defaultValue={"medium_term"}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value={"short_term"}>Short term</option>
            <option value={"medium_term"}>Medium term</option>
            <option value={"long_term"}>Long term</option>
          </select>
          {item === "tracks"
            ? topItems.items.map((track) => (
                <TopTracks key={track.id}>
                  <img alt="Album cover" src={track.album.images[2].url} />
                  {track.name} - {track.artists[0].name}
                </TopTracks>
              ))
            : topItems.items.map((artist) => (
                <TopArtists key={artist.id}>
                  {" "}
                  <img alt="Artist image" src={artist.images[2].url} />{" "}
                  {artist.name}{" "}
                </TopArtists>
              ))}
        </>
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
`;

export default Homepage;
