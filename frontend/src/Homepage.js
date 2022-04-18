import { useState, useEffect } from "react";

const Homepage = () => {
  const [msg, setMsg] = useState("");
  const [topItems, setTopItems] = useState("");

  useEffect(() => {
    fetch("/api/token")
      .then((res) => res.json())
      .then((json) => {
        setMsg(json.data);
      });
  }, []);

  const handleGetTopItems = async () => {
    const data = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${msg.access_token}`,
        },
      }
    );

    const json = await data.json();

    setTopItems(json);
  };

  console.log(topItems);

  return (
    <div>
      <button onClick={handleGetTopItems}>Get top items</button>
    </div>
  );
};

export default Homepage;
