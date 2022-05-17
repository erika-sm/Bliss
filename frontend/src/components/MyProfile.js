import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const MyProfile = ({
  currentUserProfile,
  setCurrentUserProfile,
  currentUser,
}) => {
  const { accessToken } = useContext(AppContext);
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
      <ProfilePictureContainer>
        <ProfilePicture src={currentUserProfile.profilePicture} />{" "}
      </ProfilePictureContainer>

      <DisplayNameContainer>
        <DisplayName>{currentUserProfile.displayName}</DisplayName>{" "}
      </DisplayNameContainer>
      <Vibes>
        <h2>My Vibes </h2>{" "}
        {artists.length > 0 &&
          artists.map((artist) => (
            <Vibe>
              <VibeImg src={artist.images[2].url} />
              <VibeName>{artist.name}</VibeName>
            </Vibe>
          ))}
        {tracks.length > 0 &&
          tracks.map((track) => (
            <Vibe>
              <VibeImg src={track.album.images[2].url} />
              <VibeName>{track.name}</VibeName>
            </Vibe>
          ))}
      </Vibes>
      <ButtonWrapper>
        <Button>Edit</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 150px;
  width: 150px;
`;

const ProfilePictureContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 26%;
`;
const Vibes = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 53%;
`;

const Vibe = styled.div`
  display: flex;
  text-align: center;
`;

const VibeImg = styled.img`
  border-radius: 50%;
  height: 50px;
`;

const VibeName = styled.p`
  margin-left: 5px;
`;
const DisplayName = styled.h2``;

const Wrapper = styled.div``;

const DisplayNameContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-70%);
  top: 45%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 85vh;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.div`
  background: black;
  border: none;
  color: red;
`;

export default MyProfile;
