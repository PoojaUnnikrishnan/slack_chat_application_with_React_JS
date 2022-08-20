//importing necessary components, icons and modlules.
import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Link } from "react-router-dom";

const Header = () => {
  const [user] = useAuthState(auth);
  //Firebase hooks is used here to provide state as auth

  return (
    <HeaderContainer>
      {/* Header left  */}
      <HeaderLeft>
        <Link to="/profile">
          {/* user profile and image from google  */}
          <HeaderAvatar src={user?.photoURL} alt={user?.displayName} />
        </Link>
        <AccessTimeIcon />
      </HeaderLeft>
      {/* Header search  */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search" />
      </HeaderSearch>
      {/* Header right */}
      <HeaderRight>
        <PowerSettingsNewIcon onClick={() => auth.signOut()} />
        {/* <HelpOutlineIcon /> */}
      </HeaderRight>
      <HelpOutlineIcon />
    </HeaderContainer>
  );
};
export default Header;
//Adding css using styled components.
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
  > .MuiSvgIcon-root {
    padding: 10px;
  }
`;
const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;
const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  border-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    :hover {
      color: red;
    }
    margin-left: auto;
    margin-right: 20px;
  }
`;
