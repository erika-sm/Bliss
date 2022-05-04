import React, { useContext } from "react";
import Orb from "./Orb";
import Slider from "./Slider";
import { AppContext } from "./AppContext";
import styled from "styled-components";

const Recommendations = () => {
  const { recommendationSliderArray } = useContext(AppContext);

  console.log(recommendationSliderArray);
  return (
    <Wrapper>
      {recommendationSliderArray.map((slider) => (
        <Slider
          key={slider.name}
          name={slider.name}
          min={slider.min}
          max={slider.max}
          step={slider.step}
          highHue={slider.highHue}
          lowHue={slider.lowHue}
          medHue={slider.medHue}
          defaultValue={slider.defaultValue}
          hue={slider.hue}
          defaultLightness={slider.defaultLightness}
          colorRange={slider.colorRange}
          lowSaturation={slider.lowSaturation}
          highSaturation={slider.highSaturation}
          medSaturation={slider.medSaturation}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  touch-action: none;
`;

export default Recommendations;
