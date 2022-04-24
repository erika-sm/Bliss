import React from "react";
import styled from "styled-components";

const Orb = () => {
  return (
    <div>
      <Circle></Circle>
    </div>
  );
};

const Circle = styled.div`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  border: solid;
  border-color: white;
  background-color: hsla(115, 100%, 30%, 1);
  background-image: radial-gradient(
      at 98% 26%,
      hsla(180, 100%, 35%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 63% 85%, hsla(35, 100%, 45%, 1) 0px, transparent 50%),
    radial-gradient(at 33% 85%, hsla(307, 100%, 55%, 1) 0px, transparent 50%),
    radial-gradient(at 63% 29%, hsla(254, 100%, 40%, 1) 0px, transparent 50%);
`;

export default Orb;
