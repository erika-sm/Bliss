import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Slider = ({
  name,
  min,
  max,
  step,
  defaultValue,
  highHue,
  lowHue,
  medHue,
  defaultLightness,
  colorRange,
  lowSaturation,
  highSaturation,
  medSaturation,
  description,
  setCheckedFeatures,
  checkedFeatures,
  featureValues,
  setFeatureValues,
}) => {
  const [counter, setCounter] = useState(defaultValue);
  const [lightness, setLightness] = useState(defaultLightness);
  const [currentValue, setCurrentValue] = useState(counter);

  useEffect(() => {
    if (counter > currentValue) {
      setLightness(lightness + colorRange);
    } else if (counter < currentValue) {
      setLightness(lightness - colorRange);
    }

    setCurrentValue(counter);

    setCheckedFeatures({
      ...checkedFeatures,
      [name]: counter,
    });
    setFeatureValues({
      ...featureValues,
      [name]: `&target_${name.toLowerCase()}=${counter}`,
    });
  }, [counter]);

  return (
    <Wrapper>
      <>
        {name === "Tempo" ? (
          <>
            <Title>{description}</Title>
            <FeatureWrapper>
              <div className="slidecontainer">
                <SliderContainer>
                  40
                  <SliderBar
                    type="range"
                    min={min}
                    max={max}
                    value={counter}
                    step={step}
                    className="slider"
                    onChange={(e) => {
                      setCounter(e.target.value);
                    }}
                  />
                  240
                </SliderContainer>
              </div>
              {counter >= 40 && counter <= 110 ? (
                <Circle
                  hue={lowHue}
                  lightness={lightness}
                  saturation={lowSaturation}
                />
              ) : counter > 110 && counter <= 170 ? (
                <Circle
                  hue={medHue}
                  lightness={lightness}
                  saturation={medSaturation}
                />
              ) : (
                counter > 170 &&
                counter <= 240 && (
                  <Circle
                    hue={highHue}
                    lightness={lightness}
                    saturation={highSaturation}
                  />
                )
              )}
            </FeatureWrapper>
            Target {name}: {counter}
          </>
        ) : (
          <>
            <Title>{description}</Title>
            <FeatureWrapper>
              <div className="slidecontainer">
                <SliderContainer>
                  0
                  <SliderBar
                    type="range"
                    min={min}
                    max={max}
                    value={counter}
                    step={step}
                    className="slider"
                    onChange={(e) => {
                      setCounter(e.target.value);
                    }}
                  />
                  1
                </SliderContainer>
              </div>
              {counter >= 0 && counter < 0.35 ? (
                <Circle
                  hue={lowHue}
                  lightness={lightness}
                  saturation={lowSaturation}
                />
              ) : counter >= 0.35 && counter < 0.65 ? (
                <Circle
                  hue={medHue}
                  lightness={lightness}
                  saturation={medSaturation}
                />
              ) : (
                counter >= 0.65 &&
                counter <= 1 && (
                  <Circle
                    hue={highHue}
                    lightness={lightness}
                    saturation={highSaturation}
                  />
                )
              )}
            </FeatureWrapper>
            Target {name}: {counter}
          </>
        )}
      </>
    </Wrapper>
  );
};

const SliderBar = styled.input`
  width: 210px;
  margin-left: 5px;
  margin-right: 5px;
`;

const SliderContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Title = styled.div`
  margin-bottom: -10px;
  display: flex;
  font-size: 14px;
`;

const Wrapper = styled.div`
  padding: 10px;
  font-size: 16px;
  border-bottom: solid;
`;

const Circle = styled.div`
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-top: 20px;
  border: solid;
  border-color: white;
  border-radius: 50%;

  background-color: ${(props) =>
    `hsla(${props.hue}, ${props.saturation}%, ${props.lightness}%, 1)`};
`;

const FeatureWrapper = styled.div`
  display: flex;
`;

export default Slider;
