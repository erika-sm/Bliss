import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import PlaylistModal from "./PlaylistModal";
import Header from "./Header";
import Orb from "./Orb";
import { orbLightness } from "./Utils";
import SongFeaturesTooltip from "./SongFeaturesTooltip";
const TopItems = () => {
  const [timeRange, setTimeRange] = useState("short_term");
  const [topItems, setTopItems] = useState("");
  const [item, setItem] = useState("artists");
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState([]);
  const [itemFeatures, setItemFeatures] = useState([]);
  const [isHovered, setIsHovered] = useState();

  console.log(itemFeatures);

  console.log(topItems);

  const { itemLimit, setCreatingPlaylist, creatingPlaylist } =
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
    let itemList = json.items;

    let idArray = items.map((item) => {
      return `spotify:track:${item.id}`;
    });

    setItemId({ uris: idArray });

    setLoading(false);

    let idsForFeatures = itemList
      .map((item) => {
        return item.id;
      })
      .toString();

    if (item === "tracks") {
      const fetchFeaturesData = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${idsForFeatures}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken.data.access_token}`,
          },
        }
      );

      const featureData = await fetchFeaturesData.json();

      setItemFeatures(featureData.audio_features);
    }
  };

  useEffect(() => {
    getTopItems();
  }, [timeRange, item, limit]);

  //recommendations code
  useEffect(async () => {
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    const data = await fetch(
      `https://api.spotify.com/v1/recommendations/?seed_tracks=58r5Sc6rwLR3tGYBMbEWpK&target_energy=0.8`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken.data.access_token}`,
        },
      }
    );

    const response = await data.json();

    console.log(response);
  }, []);

  return (
    <div>
      <Header />
      <PlaylistModal itemId={itemId} />

      <Wrapper>
        <Filter>
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
        </Filter>
        {loading ? (
          <SpinnerWrapper>
            <LoadingSpinner />
          </SpinnerWrapper>
        ) : (
          <TopItemsContainer
            style={{ overflow: creatingPlaylist ? "hidden" : "auto" }}
          >
            {" "}
            {topItems.items && item === "tracks" ? (
              <>
                {!creatingPlaylist && (
                  <PlaylistButtonWrapper>
                    Add tracks to a playlist
                    <AddTracksButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setCreatingPlaylist(true);
                      }}
                      className="playlist-button playlist-button--mobile"
                    ></AddTracksButton>
                  </PlaylistButtonWrapper>
                )}
                <ItemsWrapper>
                  {topItems.items.map((track) => (
                    <TopTracks key={track.id}>
                      <AlbumCover
                        alt="Album cover"
                        src={track.album.images[2].url}
                      />
                      <ItemDetails>
                        <TrackName>{track.name}</TrackName>
                        <ArtistName>{track.artists[0].name}</ArtistName>
                        <OrbContainer
                          onMouseOver={() => setIsHovered(track.id)}
                          onTouchStart={() => setIsHovered(track.id)}
                          onMouseOut={() => setIsHovered("")}
                          onTouchEnd={() => setIsHovered("")}
                        >
                          {itemFeatures.length > 1 &&
                            itemFeatures.map(
                              (feature) =>
                                feature.id === track.id && (
                                  <Orb
                                    key={feature.id}
                                    energy={orbLightness(
                                      "energy",
                                      feature.energy
                                    )}
                                    danceability={orbLightness(
                                      "danceability",
                                      feature.danceability
                                    )}
                                    acousticness={orbLightness(
                                      "acousticness",
                                      feature.acousticness
                                    )}
                                    valence={orbLightness(
                                      "valence",
                                      feature.valence
                                    )}
                                    tempo={orbLightness("tempo", feature.tempo)}
                                  />
                                )
                            )}
                          {itemFeatures.length > 1 &&
                            itemFeatures.map(
                              (feature) =>
                                feature.id === track.id &&
                                isHovered === track.id && (
                                  <SongFeaturesTooltip
                                    energy={feature.energy}
                                    energyColors={orbLightness(
                                      "energy",
                                      feature.energy
                                    )}
                                    danceability={feature.danceability}
                                    danceabilityColors={orbLightness(
                                      "danceability",
                                      feature.danceability
                                    )}
                                    acousticness={feature.acousticness}
                                    acousticnessColors={orbLightness(
                                      "acousticness",
                                      feature.acousticness
                                    )}
                                    valence={feature.valence}
                                    valenceColors={orbLightness(
                                      "valence",
                                      feature.valence
                                    )}
                                    tempo={feature.tempo}
                                    tempoColors={orbLightness(
                                      "tempo",
                                      feature.tempo
                                    )}
                                  />
                                )
                            )}
                        </OrbContainer>
                      </ItemDetails>
                    </TopTracks>
                  ))}
                </ItemsWrapper>
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
          </TopItemsContainer>
        )}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin-top: 90px;
`;

const TopArtists = styled.div``;
const TopTracks = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
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

const TopItemsContainer = styled.div`
  padding-top: 30px;
`;

const Filter = styled.div`
  background-color: black;
  position: fixed;
  margin-top: -20px;
  padding-top: 10px;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const PlaylistButtonWrapper = styled.div`
  font-size: 12px;
  right: 0;
  margin-right: 50px;
  position: absolute;
`;

const AddTracksButton = styled.button`
  margin-left: 5px;
  position: absolute;
  margin-top: -5px;
`;

const OrbContainer = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
`;

const AlbumCover = styled.img`
  height: 70px;
  width: 70px;
`;

const TrackName = styled.div``;

const ArtistName = styled.div``;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemsWrapper = styled.div`
  margin-top: 50px;
`;

export default TopItems;
