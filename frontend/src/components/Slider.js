import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Slider = ({
  name,
  min,
  max,
  step,
  defaultValue,
  hue,
  defaultLightness,
  colorRange,
}) => {
  const [counter, setCounter] = useState(defaultValue);
  const [lightness, setLightness] = useState(defaultLightness);
  const [currentValue, setCurrentValue] = useState(counter);

  console.log(counter);
  console.log(lightness);

  useEffect(() => {
    if (counter > currentValue) {
      setLightness(lightness + colorRange);
    } else if (counter < currentValue) {
      setLightness(lightness - colorRange);
    }

    setCurrentValue(counter);
  }, [counter]);

  return (
    <Wrapper>
      <>
        <Title>{name}</Title>
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
          <Circle hue={hue} lightness={lightness} />
        </FeatureWrapper>
      </>
    </Wrapper>
  );
};

const SliderBar = styled.input`
  width: 210px;
`;

const SliderContainer = styled.div`
  display: flex;
`;

const Title = styled.p`
  margin-bottom: -10px;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
`;

const Circle = styled.div`
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-top: 5px;
  border: solid;
  border-color: white;
  border-radius: 50%;

  background-color: ${(props) =>
    `hsla(${props.hue}, 100%, ${props.lightness}%, 1)`};
`;

const FeatureWrapper = styled.div`
  display: flex;
`;

export default Slider;
