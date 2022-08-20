//importing necessary components.
import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
function Login() {
  const signIn = (e) => {
    e.preventDefault(); //Prevent default refresh
    auth.signInWithPopup(provider).catch((error) => alert(error.message)); //Providing google authentication using firebase.
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://www.pinclipart.com/picdir/big/552-5521409_new-slack-logo-2019-png-transparent-svg-vector.png"
          alt=""
        />
        <h1>Sign in to the Boo's Fam</h1>
        <p>Boo.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;
//Adding css using styled components.
const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    object-fit: container;
    height: 100px;
    margin-bottom: 40px;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important; //priority given ti !important css property.
    color: white;
  }
`;
