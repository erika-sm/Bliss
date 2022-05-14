import React, { useContext, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import styled from "styled-components";
import { AppContext } from "./AppContext";
const Player = () => {
  const {
    accessToken,
    refresh,
    refreshToken,
    trackToPlay,
    playing,
    setPlaying,
  } = useContext(AppContext);

  console.log(accessToken);
  useEffect(() => {
    setPlaying(true);
  }, [trackToPlay]);
  return (
    <Wrapper>
      {" "}
      <SpotifyPlayer
        styles={{
          activeColor: "#fff",
          bgColor: "black",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
        token={accessToken}
        uris={[trackToPlay]}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlaying(false);
        }}
        play={playing}
        magnifySliderOnHover
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 100;
`;

export default Player;
