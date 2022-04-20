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
