import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import Header from "./Header";
import SeedSelection from "./SeedSelection";
import RecSummary from "./RecSummary";
import Recommendations from "./Recommendations";

const Discover = () => {
  const {
    recommendationSliderArray,
    accessToken,
    refresh,
    setTrackToPlay,
    playing,
    setPlaying,
  } = useContext(AppContext);
  const [step, setStep] = useState("intro");
  const [selectedItems, setSelectedItems] = useState([]);
  const [addItem, setAddItem] = useState();
  const [recommendations, setRecommendations] = useState();
  const [recommendationsFeatures, setRecommendationsFeatures] = useState();
  const [recommendationsIds, setRecommendationsIds] = useState();
  const [isChecked, setIsChecked] = useState(
    new Array(recommendationSliderArray.length).fill(false)
  );

  console.log(recommendations);
  const [checkedFeatures, setCheckedFeatures] = useState({
    Energy: "",
    Danceability: "",
    Acousticness: "",
    Valence: "",
    Tempo: "",
  });
  const [featureValues, setFeatureValues] = useState({
    Energy: "",
    Danceability: "",
    Acousticness: "",
    Valence: "",
    Tempo: "",
  });

  console.log(isChecked);
  console.log(checkedFeatures);

  const handleCheckbox = (position, name) => {
    const checkedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(checkedState);
  };

  return (
    <Wrapper>
      <Header />
      <TitleHeader> Discover </TitleHeader>
      <ContentWrapper>
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
              setTrackToPlay={setTrackToPlay}
              playing={playing}
              setPlaying={setPlaying}
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
            <Intro>
              {" "}
              Next, select the sliders that you wish to modify. These sliders
              will determine the feel of your recommendations. This step is
              fully optional and you can move to the next page without selecting
              any.
            </Intro>
            <NavWrapper>
              <Nav onClick={() => setStep("itemsSelection")}>
                <div className="navButtons"> &#8249; </div>
              </Nav>
              <Nav onClick={() => setStep("summary")}>
                <div className="navButtons"> &#8250; </div>
              </Nav>
            </NavWrapper>
            <SliderContainer>
              {recommendationSliderArray.map((slider, index) => (
                <SliderWrapper>
                  <input
                    type={"checkbox"}
                    value={slider.name}
                    checked={isChecked[index]}
                    onChange={() => {
                      handleCheckbox(index);
                    }}
                  />
                  {slider.name}{" "}
                  {isChecked[index] === true && (
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
                      description={slider.description}
                      setCheckedFeatures={setCheckedFeatures}
                      checkedFeatures={checkedFeatures}
                      featureValues={featureValues}
                      setFeatureValues={setFeatureValues}
                    />
                  )}
                </SliderWrapper>
              ))}
            </SliderContainer>
          </>
        )}
        {step === "summary" && (
          <>
            <RecSummary
              isChecked={isChecked}
              checkedFeatures={checkedFeatures}
              selectedItems={selectedItems}
              accessToken={accessToken}
              refresh={refresh}
              featureValues={featureValues}
              setFeatureValues={setFeatureValues}
              setRecommendations={setRecommendations}
              setStep={setStep}
              setRecommendationsFeatures={setRecommendationsFeatures}
              setRecommendationsIds={setRecommendationsIds}
            />
            <NavWrapper>
              <Nav onClick={() => setStep("sliders")}>
                <div className="navButtons"> &#8249; </div>
              </Nav>
            </NavWrapper>
          </>
        )}
        {recommendations && (
          <>
            <Recommendations
              recommendations={recommendations}
              recommendationsFeatures={recommendationsFeatures}
              recommendationsIds={recommendationsIds}
            />
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  touch-action: none;
  margin-top: 80px;
  height: 78vh;
`;

const Intro = styled.p`
  padding: 10px;
  font-size: 18px;
`;

const TitleHeader = styled.h1`
  text-align: center;
  background-color: purple;
  padding: 15px;
`;

const SliderWrapper = styled.div``;

const SliderContainer = styled.div`
  margin-top: -20px;
  font-size: 20px;
  display: block;
  overflow: auto;
  height: 370px;
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
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Nav = styled.div``;
export default Discover;
