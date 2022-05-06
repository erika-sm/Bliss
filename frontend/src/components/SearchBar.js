import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("artist");
  const [searchTerms, setSearchTerms] = useState("");
  const [results, setResults] = useState("");

  console.log(results.type);

  const getSearchedItems = async () => {
    setLoading(true);
    setResults({});
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    const data = await fetch(
      `https://api.spotify.com/v1/search?type=${searchType}&q=${searchType}:${searchTerms}&limit=5`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken.data.access_token}`,
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

    console.log(json);

    setLoading(false);
  };

  useEffect(() => {
    getSearchedItems();
  }, [searchTerms]);

  return (
    <Wrapper>
      Choose up to 5 tracks and/or artists
      <SearchWrapper>
        <select
          onChange={(e) => {
            setSearchType(e.target.value);
            setSearchTerms("");
          }}
        >
          <option value={"artist"}>Artist</option>
          <option value={"track"}>Track</option>
        </select>
        <Search
          value={searchTerms}
          type={"text"}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
      </SearchWrapper>
      {searchTerms.length > 0 && searchType === "artist" ? (
        <SearchResults>
          {results === "no matches" ? (
            <NoMatches>Couldn't find any matches</NoMatches>
          ) : (
            results.items &&
            results.items.map((result) => (
              <ResultsWrapper>
                {result.images && (
                  <ResultImage alt="Artist Image" src={result.images[2].url} />
                )}
                <ItemDetails>
                  <ArtistName> {result.name}</ArtistName>
                </ItemDetails>
              </ResultsWrapper>
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
              results.items &&
              results.items.map((result) => (
                <ResultsWrapper>
                  {result.album && (
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
              ))
            )}{" "}
          </SearchResults>
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 10px;
`;
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

export default SearchBar;
