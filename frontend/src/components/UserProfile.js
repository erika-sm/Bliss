import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const UserProfile = ({ userProfile }) => {
  const { accessToken } = useContext(AppContext);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  console.log(userProfile);

  const getVibes = async () => {
    let artists = [];
    let tracks = [];
    let selectedVibes = userProfile.itemsToDisplay;

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
  }, [userProfile]);

  return (
    <Wrapper>
      {userProfile && (
        <>
          {" "}
          <ProfilePicture src={userProfile.profilePicture} />
          <DisplayName>{userProfile.displayName}</DisplayName>
          <Vibes>
            <h3>{userProfile.displayName}'s Vibe</h3>

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
        </>
      )}
    </Wrapper>
  );
};

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 150px;
  width: 150px;
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
`;

const VibeImg = styled.img`
  border-radius: 50%;
  height: 50px;
`;

const VibeName = styled.p`
  margin-left: 5px;
`;
const DisplayName = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 45%;
`;

const Wrapper = styled.div``;

export default UserProfile;
