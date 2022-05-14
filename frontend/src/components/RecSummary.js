import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const RecSummary = ({
  isChecked,
  checkedFeatures,
  selectedItems,
  accessToken,
  refresh,
  featureValues,
  setRecommendations,
  setRecommendationsFeatures,
  setStep,
  setRecommendationsIds,
}) => {
  const [loading, setLoading] = useState(false);
  const handleRecommendations = async () => {
    setLoading(true);
    let trackIdArr = [];
    let artistIdArr = [];
    let featureArr = [];

    Object.values(featureValues).map((checked, key) => {
      if (isChecked[key] === true) {
        featureArr.push(checked);
      }
    });

    selectedItems.map((item) => {
      if (item.played_at) {
        trackIdArr.push(item.track.id);
      } else if (item.type === "track") {
        trackIdArr.push(item.id);
      } else if (item.type === "artist") {
        artistIdArr.push(item.id);
      }
    });

    const data = await fetch(
      `https://api.spotify.com/v1/recommendations/?seed_tracks=${trackIdArr.toString()}&seed_artists=${artistIdArr.toString()}&${featureArr.join(
        ""
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const response = await data.json();

    setRecommendations(response.tracks);

    let recList = response.tracks;

    let recIds = response.tracks;

    let idArray = recIds.map((item) => {
      return `spotify:track:${item.id}`;
    });

    setRecommendationsIds(idArray);

    let idsForFeatures = recList
      .map((item) => {
        return item.id;
      })
      .toString();

    const fetchFeaturesData = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${idsForFeatures}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const featureData = await fetchFeaturesData.json();

    setRecommendationsFeatures(featureData.audio_features);

    setLoading(false);
    setStep("recommendations");
  };

  return (
    <>
      {loading === true ? (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      ) : (
        <>
          <Description>
            Let's go over your selections before retrieving your
            recommendations. Hit the 'Get Recommendations' button once you're
            good to go or navigate to the previous pages to make your changes!
          </Description>

          <SelectedItems>
            <Title>Selected Items</Title>
            <OrderedList>
              {selectedItems &&
                selectedItems.map((item) =>
                  item.track ? (
                    <ListItem>
                      <List>{item.track.name}</List>{" "}
                    </ListItem>
                  ) : (
                    <ListItem>
                      <List>{item.name}</List>{" "}
                    </ListItem>
                  )
                )}
            </OrderedList>
          </SelectedItems>
          <SelectedItems>
            <Title>Mood</Title>
            <UnorderedList>
              {checkedFeatures &&
                Object.keys(checkedFeatures).map(
                  (feature, key) =>
                    isChecked[key] === true && (
                      <ListItem>
                        <List>
                          Target {feature}: {checkedFeatures[feature]}
                        </List>{" "}
                      </ListItem>
                    )
                )}
            </UnorderedList>
          </SelectedItems>

          <GetRecommendations onClick={() => handleRecommendations()}>
            <GetRecommendationsText>Get Recommendations</GetRecommendationsText>
          </GetRecommendations>
        </>
      )}
    </>
  );
};

const Description = styled.div`
  text-align: center;
`;

const GetRecommendations = styled.div`
  width: 250px;

  font-size: 18px;

  left: 50%;
  top: 75%;
  transform: translateX(-50%);
  position: absolute;
  text-align: center;
  border-bottom: solid;
  border-width: 3px;
  border-color: purple;
`;

const GetRecommendationsText = styled.p`
  margin-top: 30px;
`;

const SelectedItems = styled.div`
  margin-top: 40px;
  margin-bottom: 70px;
`;

const Title = styled.h3`
  margin-bottom: -5px;
  margin-left: 20px;
`;

const ListItem = styled.div``;

const List = styled.li`
  width: 200px;
`;

const OrderedList = styled.ol``;

const UnorderedList = styled.ul``;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
`;

export default RecSummary;
