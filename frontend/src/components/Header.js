import { useContext } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components";

const Header = () => {
  const { greeting } = useContext(AppContext);

  return (
    <Wrapper>
      <GreetingsBanner>{greeting}</GreetingsBanner>
      <PageSelection>
        <PageTab>Top Items</PageTab> <PageTab>Recommendations</PageTab>{" "}
        <PageTab>Profile</PageTab>
      </PageSelection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  background-color: black;
  width: 100%;
`;

const PageSelection = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
`;

const PageTab = styled.div`
  margin-top: 10px;
  margin-right: 15px;
`;

const GreetingsBanner = styled.div`
  font-size: 25px;
  padding: 0;
`;

export default Header;
