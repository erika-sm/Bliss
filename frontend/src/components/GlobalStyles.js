import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`


    html, body
  {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        background-color: black;
        color: white;
        height: 100%;
        width: 100%;
  
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

.helpTip {
  border-radius: 50%;
  border: solid;
  border-color: white;
  width: 15px;
  height: 15px;
  text-align: center;
  margin-left: 5px;
  font-size: 12px;
  border-width: 1px;
}

.slidecontainer {
  margin-top: 20px;

}

.navButtons {
  height: 30px;
  width: 30px;

  background-color: black;
  color: white;
  text-align: center;
  font-size: 25px;
  padding-bottom: 4px;
  

}
.arrow-box {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
}

.arrow-box .arrow-round {
  position: absolute;
  width: 50px;
  height: 50px;
  border: calc(50px / 4) solid white;
  border-radius: 50%;
  border-right-color: transparent;
  transition: transform 1s;
}

.arrow-box .arrow-round::after {
  content: "";
  position: absolute;
  top: -22.5%;
  left: 65%;
  border: calc(50px * 0.5) solid #fff;
  border-bottom-color: white;
  border-left-color: transparent;
  border-top-width: 0;
  border-right-width: 0;
}

 .arrow-rotate {
  transform: rotate(1turn) scale(1.2);
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
