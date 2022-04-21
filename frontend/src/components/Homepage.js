import styled from "styled-components";
import TopItems from "./TopItems";

const Homepage = () => {
  return (
    <Wrapper>
      <TopItems />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export default Homepage;
