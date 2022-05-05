import React, { useContext } from "react";
import Slider from "./Slider";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import Header from "./Header";
import SearchBar from "./SearchBar";

const Recommendations = () => {
  const { recommendationSliderArray } = useContext(AppContext);

  console.log(recommendationSliderArray);
  return (
    <Wrapper>
      <Header />
      <SearchBar />
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
  margin-top: 90px;
`;

export default Recommendations;
