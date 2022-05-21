import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import PlayButton from "./PlayButton";

const MyProfile = ({
  currentUserProfile,
  setCurrentUserProfile,
  currentUser,
}) => {
  const {
    accessToken,

    trackToPlay,
    setTrackToPlay,
    playing,
    setPlaying,
  } = useContext(AppContext);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [edit, setEdit] = useState(false);

  const getVibes = async () => {
    let artists = [];
    let tracks = [];
    let selectedVibes = currentUserProfile.itemsToDisplay;

    selectedVibes.map((vibe) => {
      if (vibe.track) {
        tracks.push(vibe.track);
      } else if (vibe.artist) {
        artists.push(vibe.artist);
      }
    });

    const fetchTrackData = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${tracks.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const trackData = await fetchTrackData.json();

    setTracks(trackData.tracks);

    const fetchArtistData = await fetch(
      `https://api.spotify.com/v1/artists?ids=${artists.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const artistData = await fetchArtistData.json();

    setArtists(artistData.artists);
  };

  useEffect(() => {
    getVibes();
  }, [currentUser, currentUserProfile]);

  return (
    <Wrapper>
      <ProfilePicture src={currentUserProfile.profilePicture} />{" "}
      <DisplayName>{currentUserProfile.displayName}</DisplayName>{" "}
      <FollowsContainer>
        <Follows>
          <div>Followers</div>
          <div>{currentUserProfile.followers.length}</div>
        </Follows>
        <Follows>
          <div>Following</div>
          <div>{currentUserProfile.following.length}</div>
        </Follows>
      </FollowsContainer>
      <Vibes>
        <h2>My Vibes </h2>{" "}
        {artists &&
          artists.length > 0 &&
          artists.map((artist) => (
            <Vibe>
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
                {" "}
                <PlayButton />
              </div>
              <VibeImg src={artist.images[2].url} />
              <VibeName>{artist.name}</VibeName>
            </Vibe>
          ))}
        {tracks &&
          tracks.length > 0 &&
          tracks.map((track) => (
            <Vibe>
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
                {" "}
                <PlayButton />
              </div>

              <VibeImg src={track.album.images[2].url} />
              <VibeName>
                {track.name} by {track.artists[0].name}
              </VibeName>
            </Vibe>
          ))}
      </Vibes>
    </Wrapper>
  );
};

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 150px;
  width: 150px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const Vibes = styled.div`
  text-align: center;
  position: relative;
  left: 50%;
  top: 5%;
  transform: translateX(-50%);
  width: 90vw;
`;

const Vibe = styled.div`
  display: flex;
  margin-top: -5px;
  text-align: center;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const VibeImg = styled.img`
  border-radius: 50%;
  height: 50px;
`;

const VibeName = styled.p`
  margin-left: 5px;
`;
const DisplayName = styled.h2``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  height: 55vh;
  position: fixed;
  width: 100vw;
  margin-top: -30px;
`;

const Follows = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  text-align: center;
  margin-left: 10px;
`;

const FollowsContainer = styled.div`
  display: flex;
  position: relative;
  left: 50%;
  transform: translateX(-25%);
`;

const Button = styled.button`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 50vw;
  margin-top: 30px;
`;

export default MyProfile;
