import React from "react";
import styled from "styled-components";
import { useDetectClickOutside } from "react-detect-click-outside";
import LoadingSpinner from "./LoadingSpinner";

const LyricsModal = ({ setViewLyrics, lyrics, loadingLyrics }) => {
  const clickAway = () => {
    setViewLyrics(false);
  };
  const ref = useDetectClickOutside({
    onTriggered: clickAway,
  });

  return (
    <div>
      <LyricsWrapper>
        <Modal ref={ref} className="playlistModal">
          <Close onClick={() => setViewLyrics(false)}>&times;</Close>
          {loadingLyrics ? (
            <SpinnerWrapper>
              <LoadingSpinner />
            </SpinnerWrapper>
          ) : (
            <Form>{lyrics}</Form>
          )}
        </Modal>
      </LyricsWrapper>
      )
    </div>
  );
};

const LyricsWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(8px);
`;

const Modal = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  border: solid;
  border-color: white;
  padding-right: 10px;
  background-color: black;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
`;

const Close = styled.span`
  float: right;

  font-size: 35px;

  &:hover {
    cursor: pointer;
    color: grey;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 20px;
  overflow: auto;
  height: 400px;
`;

export default LyricsModal;
