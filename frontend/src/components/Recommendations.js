import React, { useContext } from "react";
import Orb from "./Orb";
import Slider from "./Slider";
import { AppContext } from "./AppContext";

const Recommendations = () => {
  const { recommendationSliderArray } = useContext(AppContext);

  console.log(recommendationSliderArray);
  return (
    <>
      <Orb />
      {recommendationSliderArray.map((slider) => (
        <Slider
          key={slider.name}
          name={slider.name}
          min={slider.min}
          max={slider.max}
          step={slider.step}
          defaultValue={slider.defaultValue}
          hue={slider.hue}
          defaultLightness={slider.defaultLightness}
          colorRange={slider.colorRange}
        />
      ))}
    </>
  );
};

export default Recommendations;
