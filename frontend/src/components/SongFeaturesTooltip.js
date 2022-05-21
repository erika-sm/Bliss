import React from "react";
import styled from "styled-components";
import { orbLightness } from "./Utils";

const SongFeaturesTooltip = ({
  energy,
  energyColors,
  danceability,
  danceabilityColors,
  acousticness,
  acousticnessColors,
  valence,
  valenceColors,
  tempo,
  tempoColors,
}) => {
  return (
    <ToolTipWrapper>
      <Feature>
        {" "}
        Energy
        {"  "}
        {energy >= 0 && energy < 0.35 ? (
          <FeatureLevel
            lightness={energyColors[0]}
            hue={energyColors[1]}
            saturation={energyColors[2]}
          >
            Low
          </FeatureLevel>
        ) : energy >= 0.35 && energy < 0.65 ? (
          <FeatureLevel
            lightness={energyColors[0]}
            hue={energyColors[1]}
            saturation={energyColors[2]}
          >
            Medium
          </FeatureLevel>
        ) : (
          energy >= 0.65 &&
          energy <= 1 && (
            <FeatureLevel
              lightness={energyColors[0]}
              hue={energyColors[1]}
              saturation={energyColors[2]}
            >
              High
            </FeatureLevel>
          )
        )}
      </Feature>
      <Feature>
        {" "}
        Danceability{"  "}
        {danceability >= 0 && danceability < 0.35 ? (
          <FeatureLevel
            lightness={danceabilityColors[0]}
            hue={danceabilityColors[1]}
            saturation={danceabilityColors[2]}
          >
            Low
          </FeatureLevel>
        ) : danceability >= 0.35 && danceability < 0.65 ? (
          <FeatureLevel
            lightness={danceabilityColors[0]}
            hue={danceabilityColors[1]}
            saturation={danceabilityColors[2]}
          >
            Medium
          </FeatureLevel>
        ) : (
          danceability >= 0.65 &&
          danceability <= 1 && (
            <FeatureLevel
              lightness={danceabilityColors[0]}
              hue={danceabilityColors[1]}
              saturation={danceabilityColors[2]}
            >
              High
            </FeatureLevel>
          )
        )}
      </Feature>
      <Feature>
        {" "}
        Acousticness{"  "}
        {acousticness >= 0 && acousticness < 0.35 ? (
          <FeatureLevel
            lightness={acousticnessColors[0]}
            hue={acousticnessColors[1]}
            saturation={acousticnessColors[2]}
          >
            Low
          </FeatureLevel>
        ) : acousticness >= 0.35 && acousticness < 0.65 ? (
          <FeatureLevel
            lightness={acousticnessColors[0]}
            hue={acousticnessColors[1]}
            saturation={acousticnessColors[2]}
          >
            Medium
          </FeatureLevel>
        ) : (
          acousticness >= 0.65 &&
          acousticness <= 1 && (
            <FeatureLevel
              lightness={acousticnessColors[0]}
              hue={acousticnessColors[1]}
              saturation={acousticnessColors[2]}
            >
              High
            </FeatureLevel>
          )
        )}
      </Feature>

      <Feature>
        {" "}
        Valence{"  "}
        {valence >= 0 && valence < 0.35 ? (
          <FeatureLevel
            lightness={valenceColors[0]}
            hue={valenceColors[1]}
            saturation={valenceColors[2]}
          >
            Low
          </FeatureLevel>
        ) : valence >= 0.35 && valence < 0.65 ? (
          <FeatureLevel
            lightness={valenceColors[0]}
            hue={valenceColors[1]}
            saturation={valenceColors[2]}
          >
            Medium
          </FeatureLevel>
        ) : (
          valence >= 0.65 &&
          valence <= 1 && (
            <FeatureLevel
              lightness={valenceColors[0]}
              hue={valenceColors[1]}
              saturation={valenceColors[2]}
            >
              High
            </FeatureLevel>
          )
        )}
      </Feature>
      <Feature>
        {" "}
        Tempo{"  "}
        {tempo >= 0 && tempo < 80 ? (
          <FeatureLevel
            lightness={tempoColors[0]}
            hue={tempoColors[1]}
            saturation={tempoColors[2]}
          >
            Low
          </FeatureLevel>
        ) : tempo >= 80 && tempo < 110 ? (
          <FeatureLevel
            lightness={tempoColors[0]}
            hue={tempoColors[1]}
            saturation={tempoColors[2]}
          >
            Medium
          </FeatureLevel>
        ) : (
          tempo >= 110 && (
            <FeatureLevel
              lightness={tempoColors[0]}
              hue={tempoColors[1]}
              saturation={tempoColors[2]}
            >
              High
            </FeatureLevel>
          )
        )}
      </Feature>
    </ToolTipWrapper>
  );
};

const ToolTipWrapper = styled.div`
  width: 250px;
  height: 220px;
  background-color: black;
  color: white;
  border: solid;
  border-color: white;
  color: #fff;
  text-align: center;
  flex-wrap: wrap;

  border-radius: 6px;
  padding: 15px;

  z-index: 1;
  margin-top: -40px;
  margin-left: 10px;

  &::after {
    content: "";
    position: absolute;
    top: 52%;
    right: 100%;
    margin-top: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
`;
const FeatureLevel = styled.div`
  margin-bottom: 5px;
  color: ${(props) =>
    `hsla(${props.hue}, ${props.saturation}%, ${props.lightness}%, 1 )`};
`;

const Feature = styled.div``;

export default SongFeaturesTooltip;
