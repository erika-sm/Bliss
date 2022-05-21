import React, { useState, useContext } from "react";
import styled from "styled-components";
import Orb from "./Orb";
import { orbLightness } from "./Utils";
import SongFeaturesTooltip from "./SongFeaturesTooltip";
import PlaylistModal from "./PlaylistModal";
import { AppContext } from "./AppContext";
import PlayButton from "./PlayButton";
import LyricsModal from "./LyricsModal";

const Recommendations = ({
  recommendations,
  recommendationsFeatures,
  recommendationsIds,
}) => {
  const [isHovered, setIsHovered] = useState();
  const [viewLyrics, setViewLyrics] = useState();
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [lyrics, setLyrics] = useState();

  const {
    creatingPlaylist,
    setCreatingPlaylist,
    trackToPlay,
    setTrackToPlay,
    playing,
    setPlaying,
  } = useContext(AppContext);

  const findLyrics = async (artist, track) => {
    setViewLyrics(true);
    setLoadingLyrics(true);
    const fetchLyrics = await fetch(
      `/api/lyrics?artist=${artist}&track=${track}`
    );

    const lyricsRes = await fetchLyrics.json();
    if (lyricsRes.status === 200) {
      setLyrics(lyricsRes.data);
      setLoadingLyrics(false);
    } else {
      setLyrics(lyricsRes.message);
      setLoadingLyrics(false);
    }
  };

  return (
    <div
      style={{
        overflow: creatingPlaylist ? "hidden" : "auto",
      }}
    >
      {viewLyrics && (
        <LyricsModal
          setViewLyrics={setViewLyrics}
          lyrics={lyrics}
          loadingLyrics={loadingLyrics}
        />
      )}
      <PlaylistModal itemId={recommendationsIds} />
      <div style={{ textAlign: "center" }}>
        <span>Your Recommendations</span>
      </div>
      {!creatingPlaylist && (
        <PlaylistButtonWrapper
          onClick={(e) => {
            e.stopPropagation();
            setCreatingPlaylist(true);
          }}
        >
          Add these tracks to a playlist +
        </PlaylistButtonWrapper>
      )}
      <ItemsWrapper>
        {recommendations.map((track) => (
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
              {creatingPlaylist || viewLyrics ? <div></div> : <PlayButton />}
            </div>
            <AlbumCover alt="Album cover" src={track.album.images[2].url} />
            <ItemDetails>
              <TrackName>{track.name}</TrackName>
              <ArtistName>{track.artists[0].name}</ArtistName>
              <ExtrasContainer>
                <OrbContainer
                  onMouseOver={() => setIsHovered(track.id)}
                  onTouchStart={() => setIsHovered(track.id)}
                  onMouseOut={() => setIsHovered("")}
                  onTouchEnd={() => setIsHovered("")}
                >
                  Mood:
                  {recommendationsFeatures &&
                    recommendationsFeatures.length > 1 &&
                    recommendationsFeatures.map(
                      (feature) =>
                        feature.id === track.id && (
                          <Orb
                            key={feature.id}
                            energy={orbLightness("energy", feature.energy)}
                            danceability={orbLightness(
                              "danceability",
                              feature.danceability
                            )}
                            acousticness={orbLightness(
                              "acousticness",
                              feature.acousticness
                            )}
                            valence={orbLightness("valence", feature.valence)}
                            tempo={orbLightness("tempo", feature.tempo)}
                          />
                        )
                    )}
                  {recommendationsFeatures &&
                    recommendationsFeatures.length > 1 &&
                    recommendationsFeatures.map(
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
                            tempoColors={orbLightness("tempo", feature.tempo)}
                          />
                        )
                    )}
                </OrbContainer>
                <Lyrics
                  onClick={() => findLyrics(track.artists[0].name, track.name)}
                >
                  || &nbsp; Lyrics
                </Lyrics>
              </ExtrasContainer>
            </ItemDetails>
          </TopTracks>
        ))}
      </ItemsWrapper>
    </div>
  );
};

const TopTracks = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const ExtrasContainer = styled.div`
  display: flex;

  margin-top: 20px;
  width: 100vw;
`;

const Lyrics = styled.div`
  margin-left: 70px;
`;

const PlaylistButtonWrapper = styled.div`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 10px;
  border-bottom: solid;
  border-top: solid;
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
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

const ItemsWrapper = styled.div`
  margin-top: 30px;
  display: block;
  overflow: auto;
  height: 470px;
`;

export default Recommendations;
