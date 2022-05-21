import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import PlayButton from "./PlayButton";

const UserProfile = ({
  userProfile,
  setUserProfile,
  currentUserProfile,
  setCurrentUserProfile,
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

  const handleFollowUser = async () => {
    const body = {
      userToFollow: userProfile._id,
      currentUser: currentUserProfile._id,
    };
    const follow = await fetch("/api/follow-user", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const followRes = await follow.json();

    const fetchUser = await fetch(`/api/get-user/${userProfile.username}`);
    const user = await fetchUser.json();

    if (user.status === 200) {
      setUserProfile(user.data);
    }

    const fetchCUser = await fetch(
      `/api/get-user/${currentUserProfile.username}`
    );
    const cUser = await fetchCUser.json();

    if (cUser.status === 200) setCurrentUserProfile(cUser.data);
  };

  const handleUnFollowUser = async () => {
    const body = {
      userToUnfollow: userProfile._id,
      currentUser: currentUserProfile._id,
    };
    const unfollow = await fetch("/api/unfollow-user", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const unfollowRes = await unfollow.json();

    const fetchUser = await fetch(`/api/get-user/${userProfile.username}`);
    const user = await fetchUser.json();

    if (user.status === 200) {
      setUserProfile(user.data);
    }

    const fetchCUser = await fetch(
      `/api/get-user/${currentUserProfile.username}`
    );
    const cUser = await fetchCUser.json();

    if (cUser.status === 200) setCurrentUserProfile(cUser.data);
  };
  return (
    <Wrapper>
      {userProfile && (
        <>
          {" "}
          <ProfilePicture src={userProfile.profilePicture} />
          <DisplayName>{userProfile.displayName}</DisplayName>
          <FollowsContainer>
            <Follows>
              <div>Followers</div>
              <div>{userProfile.followers.length}</div>
            </Follows>
            <Follows>
              <div>Following</div>
              <div>{userProfile.following.length}</div>
            </Follows>
          </FollowsContainer>
          <Vibes>
            <h2>Vibes </h2>{" "}
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
            {tracks.length > 0 &&
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
        </>
      )}
      {userProfile.followers.includes(currentUserProfile._id) ? (
        <Button onClick={handleUnFollowUser}>Unfollow</Button>
      ) : (
        <Button onClick={handleFollowUser}>Follow</Button>
      )}
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
  transform: translateX(-50%);
  width: 90vw;
`;

const Vibe = styled.div`
  display: flex;
  margin-top: -5px;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  height: 55vh;
  position: fixed;
  width: 100vw;
  margin-top: -20px;
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
  margin-top: 20px;
`;

export default UserProfile;
