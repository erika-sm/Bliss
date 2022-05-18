import React, { useState, useContext } from "react";
import styled from "styled-components";
import Orb from "./Orb";
import { orbLightness } from "./Utils";
import SongFeaturesTooltip from "./SongFeaturesTooltip";
import PlaylistModal from "./PlaylistModal";
import { AppContext } from "./AppContext";
import PlayButton from "./PlayButton";

const Recommendations = ({
  recommendations,
  recommendationsFeatures,
  recommendationsIds,
}) => {
  const [isHovered, setIsHovered] = useState();

  const {
    creatingPlaylist,
    setCreatingPlaylist,
    trackToPlay,
    setTrackToPlay,
    playing,
    setPlaying,
  } = useContext(AppContext);

  return (
    <div style={{ overflow: creatingPlaylist ? "hidden" : "auto" }}>
      <PlaylistModal itemId={recommendationsIds} />
      Your Recommendations
      <PlaylistButtonWrapper
        onClick={(e) => {
          e.stopPropagation();
          setCreatingPlaylist(true);
        }}
      >
        Add these tracks to a playlist +
      </PlaylistButtonWrapper>
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
              <PlayButton />
            </div>
            <AlbumCover alt="Album cover" src={track.album.images[2].url} />
            <ItemDetails>
              <TrackName>{track.name}</TrackName>
              <ArtistName>{track.artists[0].name}</ArtistName>
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
                          energyColors={orbLightness("energy", feature.energy)}
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
            </ItemDetails>
          </TopTracks>
        ))}
      </ItemsWrapper>
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

const PlaylistButtonWrapper = styled.div`
  font-size: 18px;

  border-bottom: solid;
  border-top: solid;
  text-align: center;
  margin-top: 10px;
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
  margin-top: 30px;
  display: block;
  overflow: auto;
  height: 470px;
`;

export default Recommendations;
