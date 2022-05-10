import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import Header from "./Header";
import SeedSelection from "./SeedSelection";

const Recommendations = () => {
  const { recommendationSliderArray, accessToken, refresh } =
    useContext(AppContext);
  const [step, setStep] = useState("intro");
  const [loading, setLoading] = useState(false);
  const [recommendationSeed, setRecommendationSeed] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [addItem, setAddItem] = useState();

  console.log(selectedItems.length);

  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <TitleHeader> Discover</TitleHeader>
        {step === "intro" && (
          <>
            <Intro>
              {" "}
              Take full advantage of Spotify's toolset to obtain track or artist
              recommendations based on specific criteria that YOU choose.
            </Intro>

            <GetStarted onClick={() => setStep("itemsSelection")}>
              <GetStartedText>Get Started</GetStartedText>
            </GetStarted>
          </>
        )}
        {step === "itemsSelection" && (
          <>
            <SeedSelection
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              addItem={addItem}
              setAddItem={setAddItem}
            />
            <NavWrapper>
              <Nav onClick={() => setStep("intro")}>
                <div className="navButtons"> &#8249; </div>
              </Nav>
              {selectedItems.length > 0 && (
                <Nav onClick={() => setStep("sliders")}>
                  <div className="navButtons"> &#8250; </div>
                </Nav>
              )}
            </NavWrapper>
          </>
        )}
        {step === "sliders" && (
          <>
            <p>
              {" "}
              Next, select the sliders that you wish to modify. These sliders
              will determine the feel of your recommendations.
            </p>
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

            <NavWrapper>
              <Nav onClick={() => setStep("itemsSelection")}>
                <div className="navButtons"> &#8249; </div>
              </Nav>
              <Nav onClick={() => setStep("summary")}>
                <div className="navButtons"> &#8250; </div>
              </Nav>
            </NavWrapper>
          </>
        )}
        {step === "summary" && (
          <>
            <div>Summary</div>
            <NavWrapper>
              <Nav onClick={() => setStep("sliders")}>
                Previous
                <div className="navButtons"> &#8249; </div>
              </Nav>
            </NavWrapper>
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  touch-action: none;
  margin-top: 90px;
`;

const Intro = styled.p`
  text-align: center;
  padding: 10px;
  font-size: 20px;
`;

const TitleHeader = styled.h1`
  text-align: center;
  background-color: purple;
  padding: 15px;
`;
const ContentWrapper = styled.div``;

const GetStarted = styled.div`
  border: solid;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  font-size: 15px;
  width: 250px;
  height: 80px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  position: absolute;
`;

const GetStartedText = styled.p`
  position: absolute;
`;

const NavWrapper = styled.div`
  position: absolute;

  display: flex;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-40%);
  bottom: 0;
`;

const Nav = styled.div`
  margin-right: 50px;
  text-align: center;
`;
export default Recommendations;
