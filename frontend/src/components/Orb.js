import React from "react";
import styled from "styled-components";

const Orb = ({ energy, danceability, acousticness, valence, tempo }) => {
  console.log(acousticness);
  return (
    <div>
      <Circle
        energyLightness={energy[0]}
        energyHue={energy[1]}
        energySaturation={energy[2]}
        danceabilityLightness={danceability[0]}
        danceabilityHue={danceability[1]}
        danceabilitySaturation={danceability[2]}
        acousticnessLightness={acousticness[0]}
        acousticnessHue={acousticness[1]}
        acousticnessSaturation={acousticness[2]}
        valenceLightness={valence[0]}
        valenceHue={valence[1]}
        valenceSaturation={valence[2]}
        tempoLightness={tempo[0]}
        tempoHue={tempo[1]}
        tempoSaturation={tempo[2]}
      ></Circle>
    </div>
  );
};

const Circle = styled.div`
  border-radius: 50%;

  height: 30px;
  width: 30px;

  background-color: ${(props) =>
    `hsla(${props.energyHue}, ${props.energySaturation}%, ${props.energyLightness}%, 1)`};
  background-image: ${(props) => `radial-gradient(
      at 98% 26%,
      hsla(${props.danceabilityHue}, ${props.danceabilitySaturation}%, ${props.danceabilityLightness}%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 63% 85%, hsla(${props.acousticnessHue}, ${props.acousticnessSaturation}%, ${props.acousticnessLightness}%, 1) 0px, transparent 50%),
    radial-gradient(at 33% 85%, hsla(${props.valenceHue}, ${props.valenceSaturation}%, ${props.valenceLightness}%, 1) 0px, transparent 70%),
    radial-gradient(at 63% 29%, hsla(${props.tempoHue}, ${props.tempoSaturation}%, ${props.tempoLightness}%, 1) 0px, transparent 50%)`};
`;

export default Orb;
