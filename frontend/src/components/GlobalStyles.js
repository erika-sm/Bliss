import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`


    html, body
  {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        background-color: black;
        color: white;
  
    }

 .greetingMorning {
    background: #FF5F6D;  
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D); 
    background: linear-gradient(to right, #FFC371, #FF5F6D); 
 }

 .spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.spinner div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: spinner 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.spinner div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.spinner div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.spinner div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes spinner {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

.playlistModal{
  height: 50%;
        width: 30%;
}

.playlist-button {
	border: 2px solid lightgrey;
	background-color: black;
	font-size: 16px;
	height: 2.5em;
	width: 2.5em;
	border-radius: 999px;
	position: relative;
	
	&:after,
	&:before {
		content: "";
		display: block;
		background-color: white;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	&:before {
		height: 1em;
		width: 0.2em;
	}

	&:after {
		height: 0.2em;
		width: 1em;
	}
}

.playlist-button--mobile {
	font-size: 10px;
}

.orb{ 
/* border: solid;
border-color: white;
background-color:#ff99f1;
background-image:
radial-gradient(at 9% 17%, hsla(182,70%,68%,1) 0px, transparent 50%),
radial-gradient(at 98% 26%, hsla(228,70%,76%,1) 0px, transparent 50%),
radial-gradient(at 24% 29%, hsla(70,68%,71%,1) 0px, transparent 50%),
radial-gradient(at 33% 85%, hsla(100,98%,66%,1) 0px, transparent 50%); */

}

.slidecontainer {
  margin-top: 20px;

}

.slider {
  -webkit-appearance: none;
  
  height: 15px;
  border-radius: 5px;
  background: white;
  outline: none;
  -webkit-transition: .2s;
  transition: opacity .2s;
  pointer-events: none;
 
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: white;
  border: solid;
pointer-events: auto;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: white;
  border: solid;
  cursor: pointer;
  pointer-events: auto;
}


@media all and (max-width: 1000px){
    .playlistModal {
        height: 50%;
        width: 50%;
}
}



@media all and (max-width: 700px){
    .playlistModal {
        height: 50%;
        width: 65%;
}
}


`;
