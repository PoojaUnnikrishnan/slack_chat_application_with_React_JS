//importing necessary components and modlules.
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Header from "./Components/Header";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./Components/Login";
import Spinner from "react-spinkit";
import Profile from "./Components/Profile";
function App() {
  const [user, loading] = useAuthState(auth); // Making use of react firebase hooks
  if (loading) {
    //if the page is loading then it will return JSX elements inside the return statement.
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://www.pinclipart.com/picdir/big/552-5521409_new-slack-logo-2019-png-transparent-svg-vector.png"
            alt=""
          />
          {/* Loading icon  */}
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        {!user ? ( //If not a user app will take to login page.
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                {/* Routing in React js  */}
                <Route exact path="/" element={<Chat />} />
                <Route exact path="/profile" element={<Profile />} />
              </Routes>
            </AppBody>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
//Adding css using styled components.
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
