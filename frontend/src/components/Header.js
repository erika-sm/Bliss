import { useContext } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components";

const Header = () => {
  const { greeting, setSelectedTab, selectedTab } = useContext(AppContext);

  return (
    <Wrapper>
      <GreetingsBanner>{greeting}</GreetingsBanner>
      <PageSelection>
        <PageTab
          style={{ borderBottom: selectedTab === "topItems" && "solid" }}
          onClick={() => setSelectedTab("topItems")}
        >
          Top Items
        </PageTab>{" "}
        <PageTab
          style={{ borderBottom: selectedTab === "discover" && "solid" }}
          onClick={() => setSelectedTab("discover")}
        >
          {" "}
          Discover
        </PageTab>{" "}
        <PageTab
          style={{ borderBottom: selectedTab === "profile" && "solid" }}
          onClick={() => setSelectedTab("profile")}
        >
          Profile
        </PageTab>
      </PageSelection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  background-color: black;
  width: 100%;
  z-index: 100;
`;

const PageSelection = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
`;

const PageTab = styled.div`
  height: 20px;
  margin-top: 10px;
  margin-right: 15px;
  border-color: white;

  &:hover {
    border-bottom: solid;
    border-color: white;
  }
`;

const GreetingsBanner = styled.div`
  font-size: 25px;
  padding: 0;
`;

export default Header;
