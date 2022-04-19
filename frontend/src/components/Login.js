import { useEffect } from "react";
import "animate.css";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let redirect = useNavigate();

  const handleSignIn = () => {
    redirect("/api/login");
  };
  return (
    <Wrapper className="titleLogo">
      <LogoWrapper>
        <Logo className=" animate__animated animate__jackInTheBox animate__slow">
          bliss
        </Logo>
      </LogoWrapper>
      <SignInOptions>
        <SignInSpotify>
          <SpotifyLogo className="fa fa-spotify"> </SpotifyLogo>
          <SignInText>
            <Link href={"/api/login"}>Sign in with Spotify</Link>
          </SignInText>
        </SignInSpotify>
        <DemoAccount>
          Don't have a Spotify account? Try out our demo
        </DemoAccount>
      </SignInOptions>
    </Wrapper>
  );
};

const slideUp = keyframes`
  0%{
    transform: translateY(0px);

  }100%{
    transform: translateY(-60%);
  }`;

const fadeIn = keyframes`
  0%{
    transform: translateY(0px);
    opacity: 0;
   

  }100%{
    transform: translateY(-35%);
    opacity: 1;
  }`;
const Wrapper = styled.div`
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
`;

const Logo = styled.h1`
  font-size: 75px;
  margin-left: 40px;
`;

const LogoWrapper = styled.div`
  animation: ${slideUp} 1000ms forwards;
  animation-delay: 2.5s;
`;

const SignInOptions = styled.div`
  animation: ${fadeIn} 1000ms forwards;
  animation-delay: 2.5s;
  opacity: 0;

  width: 250px;
`;

const SignInSpotify = styled.div`
  border: solid;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  font-size: 15px;
`;

const SpotifyLogo = styled.i`
  font-size: 35px;
  margin-right: 10px;
  margin-top: 6px;
`;

const SignInText = styled.p`
  margin-bottom: 5px;
`;

const DemoAccount = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
`;
export default Login;
