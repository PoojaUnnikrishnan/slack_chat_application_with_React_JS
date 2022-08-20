//importing necessary components, icons and modlules.
import React from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Profile = () => {
  const [user] = useAuthState(auth);
  //Firebase hooks is used here to provide state of auth
  return (
    <>
      <Profilecontent>
        <Head>
          <h1>Profile</h1>
        </Head>
        <hr class="solid"></hr>
        <Image>
          {/* Since it is google authentication, This will provide image and name as of in google  */}
          <img src={user?.photoURL} alt={user?.displayName} />
        </Image>
        <Userdetails>
          <h2>{user?.displayName}</h2>
          <h3>Add a title</h3>
        </Userdetails>
        <Icons>
          <SentimentSatisfiedRoundedIcon />

          <EditIcon />
          <MoreHorizIcon />
        </Icons>
      </Profilecontent>
    </>
  );
};

export default Profile;
//Adding css using styled components.
const Profilecontent = styled.div`
  width: 100%;
`;
const Image = styled.div`
  display: flex;
  justify-content: center;
  > img {
    margin-top: 20px;
    width: 300px;
    border-radius: 10px;
  }
`;
const Userdetails = styled.div`
  margin-top: 20px;
  > h2 {
    display: flex;
    justify-content: center;
  }
  > h3 {
    color: rgb(33, 198, 244);
    display: flex;
    justify-content: center;
  }
`;
const Icons = styled.div`
  display: flex;
  justify-content: center;
  > .MuiSvgIcon-root {
    background-color: rgb(226, 224, 222);
    padding: 10px;
    margin: 5px;
    border-radius: 50%;
  }
`;

const Head = styled.div`
  margin-top: 70px;
  font-weight: 400;
  margin-left: 20px;
`;
