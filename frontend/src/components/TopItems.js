import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import PlaylistModal from "./PlaylistModal";
import Header from "./Header";
import Orb from "./Orb";
import { orbLightness } from "./Utils";
import SongFeaturesTooltip from "./SongFeaturesTooltip";
import PlayButton from "./PlayButton";
const TopItems = () => {
  const [timeRange, setTimeRange] = useState("short_term");
  const [topItems, setTopItems] = useState("");
  const [item, setItem] = useState("tracks");
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState([]);
  const [itemFeatures, setItemFeatures] = useState([]);
  const [isHovered, setIsHovered] = useState();

  const {
    itemLimit,
    setCreatingPlaylist,
    creatingPlaylist,
    accessToken,
    refresh,
    refreshToken,
    trackToPlay,
    setTrackToPlay,
    playing,
    setPlaying,
  } = useContext(AppContext);

  console.log(playing);
  console.log(trackToPlay);

  const getTopItems = async () => {
    setLoading(true);
    if (accessToken && refreshToken) {
      const data = await fetch(
        `https://api.spotify.com/v1/me/top/${item}?time_range=${timeRange}&limit=${limit}`,
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
          `https://api.spotify.com/v1/me/top/${item}?time_range=${timeRange}&limit=${limit}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const pushedData = await data.json();
        setTopItems(pushedData);
      } else setTopItems(json);

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
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const featureData = await fetchFeaturesData.json();

        setItemFeatures(featureData.audio_features);
      }
    }
  };

  useEffect(() => {
    getTopItems();
  }, [timeRange, item, limit, accessToken, refreshToken]);

  return (
    <div>
      <Header />

      <PlaylistModal itemId={itemId} />

      <Wrapper>
        <TitleHeader>Top Items</TitleHeader>
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
            <option value={"tracks"}>tracks</option>
            <option value={"artists"}>artists</option>{" "}
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
                <ItemsWrapper>
                  {!creatingPlaylist && (
                    <PlaylistButtonWrapper
                      onClick={(e) => {
                        e.stopPropagation();
                        setCreatingPlaylist(true);
                      }}
                    >
                      Add tracks to a playlist +
                    </PlaylistButtonWrapper>
                  )}
                  {topItems.items.map((track) => (
                    <TopTracks key={track.id}>
                      <div
                        onClick={() => {
                          if (
                            playing === true &&
                            trackToPlay === `spotify:track:${track.id}`
                          ) {
                            setPlaying(false);
                          } else if (
                            trackToPlay === `spotify:track:${track.id}` &&
                            !playing
                          ) {
                            setPlaying(true);
                          } else {
                            setTrackToPlay(`spotify:track:${track.id}`);
                          }
                        }}
                      >
                        <PlayButton />
                      </div>
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
                <>
                  <TopArtists>
                    <div
                      onClick={() => {
                        if (
                          playing === true &&
                          trackToPlay === `spotify:artist:${artist.id}`
                        ) {
                          setPlaying(false);
                        } else if (
                          trackToPlay === `spotify:artist:${artist.id}` &&
                          !playing
                        ) {
                          setPlaying(true);
                        } else {
                          setTrackToPlay(`spotify:artist:${artist.id}`);
                        }
                      }}
                    >
                      <PlayButton />
                    </div>{" "}
                    <AlbumCover alt="Artist image" src={artist.images[2].url} />{" "}
                    <Artist>{artist.name} </Artist>
                  </TopArtists>
                </>
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

const TopArtists = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const Artist = styled.div`
  margin-top: 35px;
`;
const TopTracks = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const TitleHeader = styled.h1`
  text-align: center;
  background-color: blue;
  padding: 15px;
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
  height: 520px;
  display: block;
  overflow: auto;
`;

const Filter = styled.div`
  background-color: black;
  margin-top: -20px;
  padding-top: 10px;
  width: 100vw;
  display: flex;
  justify-content: center;
  z-index: 100;
`;

const PlaylistButtonWrapper = styled.h3`
  font-size: 18px;
  margin-top: -20px;
  margin-bottom: 10px;
  border-bottom: solid;
  border-top: solid;
  text-align: center;
`;

const AddTracksButton = styled.button`
  text-align: center;
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
  height: 100vh;
`;

export default TopItems;
