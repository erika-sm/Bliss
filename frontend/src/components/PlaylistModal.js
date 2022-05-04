import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AppContext } from "./AppContext";
import LoadingSpinner from "./LoadingSpinner";

const PlaylistModal = ({ itemId }) => {
  const [loading, setLoading] = useState(false);
  const [initialPlaylistData, setInitialPlaylistData] = useState({
    name: "",
    description: "",
    public: "",
  });

  const { creatingPlaylist, setCreatingPlaylist, currentUser, createPlaylist } =
    useContext(AppContext);
  const clickAway = () => {
    setCreatingPlaylist(false);
  };
  const ref = useDetectClickOutside({
    onTriggered: clickAway,
  });

  const handlePlaylistCreation = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createPlaylist(currentUser, initialPlaylistData, itemId);

    setLoading(false);
  };

  return (
    <div>
      {creatingPlaylist && (
        <PlaylistWrapper>
          <Modal ref={ref} className="playlistModal">
            <Title>Create Your Playlist</Title>
            <Close onClick={() => setCreatingPlaylist(false)}>&times;</Close>
            {loading ? (
              <SpinnerWrapper>
                <LoadingSpinner />
              </SpinnerWrapper>
            ) : (
              <Form onSubmit={handlePlaylistCreation}>
                Playlist name:{" "}
                <Name
                  onChange={(e) =>
                    setInitialPlaylistData({
                      ...initialPlaylistData,
                      name: e.target.value,
                    })
                  }
                  required
                  type={"text"}
                />
                Description (optional):{" "}
                <Description
                  onChange={(e) =>
                    setInitialPlaylistData({
                      ...initialPlaylistData,
                      description: e.target.value,
                    })
                  }
                />
                <Visibility>
                  <label>Private</label>
                  <RadioButton
                    name="visibility"
                    id="private"
                    value="private"
                    type={"radio"}
                    onClick={() =>
                      setInitialPlaylistData({
                        ...initialPlaylistData,
                        public: false,
                      })
                    }
                    required
                  />
                  <label>Public</label>
                  <RadioButton
                    name="visibility"
                    id="public"
                    value="public"
                    type={"radio"}
                    required
                    onClick={() =>
                      setInitialPlaylistData({
                        ...initialPlaylistData,
                        public: true,
                      })
                    }
                  />
                </Visibility>
                <SubmitButton>Create Playlist</SubmitButton>
              </Form>
            )}
          </Modal>
        </PlaylistWrapper>
      )}
    </div>
  );
};

const PlaylistWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(8px);
`;

const Name = styled.input`
  margin-bottom: 15px;
`;

const Modal = styled.div`
  position: absolute;
  top: 15%;
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

const Visibility = styled.div`
  display: flex;
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

const Description = styled.textarea`
  resize: none;
  margin-bottom: 15px;
  height: 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 90px;
`;

const SubmitButton = styled.button`
  margin-top: 60px;
  background-color: black;
  color: white;
  border: solid;
  border-color: white;
  width: 50%;
  height: 5vh;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 65%;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  text-align: center;
`;

export default PlaylistModal;
