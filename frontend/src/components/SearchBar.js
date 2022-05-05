import React, { useContext, useEffect, useState } from "react";

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState();

  const track = "losing you";

  const getSearchedItems = async () => {
    setLoading(true);
    const token = await fetch("/api/token");
    const parsedToken = await token.json();

    const data = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=track:${track}+artist:solange&limit=5`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken.data.access_token}`,
        },
      }
    );

    const json = await data.json();

    console.log(json);
  };

  useEffect(() => {
    getSearchedItems();
  }, []);

  return <div>search bar</div>;
};

export default SearchBar;
