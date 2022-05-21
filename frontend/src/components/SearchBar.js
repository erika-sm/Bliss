import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import PlayButton from "./PlayButton";
import { useDetectClickOutside } from "react-detect-click-outside";

const SearchBar = ({ addSelectedItems, setAddItem, addItem }) => {
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("track");
  const [searchTerms, setSearchTerms] = useState("");
  const [results, setResults] = useState();

  const { accessToken, trackToPlay, setTrackToPlay, playing, setPlaying } =
    useContext(AppContext);

  const clickAway = () => {
    setSearchTerms("");
  };
  const ref = useDetectClickOutside({
    onTriggered: clickAway,
  });

  const getSearchedItems = async () => {
    setLoading(true);

    if (accessToken) {
      setResults({});

      const data = await fetch(
        `https://api.spotify.com/v1/search?type=${searchType}&q=${searchType}:${searchTerms}&limit=5`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const json = await data.json();

      if (searchType === "artist") {
        if (json.artists.total === 0) {
          setResults("no matches");
        } else {
          setResults(json.artists);
        }
      } else if (searchType === "track") {
        if (json.tracks.total === 0) {
          setResults("no matches");
        } else {
          setResults(json.tracks);
        }
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    let cancel = false;
    if (cancel) return;

    getSearchedItems();
    return () => (cancel = true);
  }, [searchTerms, accessToken]);

  return (
    <Wrapper ref={ref}>
      <SearchWrapper>
        <select
          onChange={(e) => {
            setSearchType(e.target.value);
            setSearchTerms("");
          }}
        >
          <option value={"track"}>Track</option>
          <option value={"artist"}>Artist</option>
        </select>
        <Search
          value={searchTerms}
          type={"text"}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
      </SearchWrapper>
      {searchTerms.length > 0 && searchType === "artist" ? (
        <SearchResults ref={ref}>
          {results === "no matches" ? (
            <NoMatches>Couldn't find any matches</NoMatches>
          ) : (
            results &&
            results.items &&
            results.items.map((result) => (
              <ResultContainer>
                <div
                  onClick={() => {
                    if (
                      playing === true &&
                      trackToPlay === `spotify:artist:${result.id}`
                    ) {
                      setPlaying(false);
                    } else if (
                      trackToPlay === `spotify:artist:${result.id}` &&
                      !playing
                    ) {
                      setPlaying(true);
                    } else {
                      setTrackToPlay(`spotify:artist:${result.id}`);
                    }
                  }}
                >
                  <PlayButton />
                </div>
                <ResultsWrapper
                  onClick={() => {
                    addSelectedItems(result);
                    setSearchTerms("");
                    setAddItem(!addItem);
                  }}
                >
                  {result.images && result.images[0] && result && (
                    <ResultImage
                      alt="Artist Image"
                      src={result.images[0].url}
                    />
                  )}
                  <ItemDetails>
                    <ArtistName> {result.name}</ArtistName>
                  </ItemDetails>
                </ResultsWrapper>
              </ResultContainer>
            ))
          )}{" "}
        </SearchResults>
      ) : (
        searchTerms.length > 0 &&
        searchType === "track" && (
          <SearchResults>
            {results === "no matches" ? (
              <NoMatches>Couldn't find any matches</NoMatches>
            ) : (
              results &&
              results.items &&
              results.items.map((result) => (
                <ResultContainer>
                  <div
                    onClick={() => {
                      if (
                        playing === true &&
                        trackToPlay === `spotify:track:${result.id}`
                      ) {
                        setPlaying(false);
                      } else if (
                        trackToPlay === `spotify:track:${result.id}` &&
                        !playing
                      ) {
                        setPlaying(true);
                      } else {
                        setTrackToPlay(`spotify:track:${result.id}`);
                      }
                    }}
                  >
                    <PlayButton />
                  </div>
                  <ResultsWrapper
                    onClick={() => {
                      addSelectedItems(result);
                      setSearchTerms("");
                      setAddItem(!addItem);
                    }}
                  >
                    {result.album && result.album.images[2] && (
                      <ResultImage
                        alt="Album Cover"
                        src={result.album.images[2].url}
                      />
                    )}

                    <ItemDetails>
                      <TrackName>{result.name}</TrackName>
                      <ArtistName>
                        {result.artists && result.artists[0].name}
                      </ArtistName>
                    </ItemDetails>
                  </ResultsWrapper>
                </ResultContainer>
              ))
            )}{" "}
          </SearchResults>
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Search = styled.input`
  width: 220px;
`;

const SearchResults = styled.div`
  width: 261px;
  background-color: black;
  border: solid;
  border-color: grey;
  position: absolute;
  padding: 10px;
  z-index: 100;
`;

const NoMatches = styled.div``;

const LoadingWrapper = styled.div`
  margin-left: 80px;
`;

const ResultImage = styled.img`
  height: 50px;
  width: 50px;
`;
const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 5px;
`;

const TrackName = styled.div``;

const ArtistName = styled.div``;

const ResultsWrapper = styled.div`
  display: flex;
`;

const ResultContainer = styled.div`
  display: flex;
`;

export default SearchBar;
