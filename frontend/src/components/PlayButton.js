import React, { useState } from "react";

const PlayButton = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      onClick={() => setClicked(!clicked)}
      className={clicked ? "playButton active" : "playButton"}
    >
      <div className="playBackground" x="0" y="0"></div>
      <div class="playIcon">
        <div class="playTri playTransition" x="0" y="0" fill="#fff"></div>
        <div class="playTri playIconTransition" x="0" y="0" fill="#fff"></div>
      </div>
      <div class="playPointer"></div>
    </div>
  );
};

export default PlayButton;
