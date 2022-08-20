//importing necessary components, icons and modlules.
import React, { useState } from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function Sidebar() {
  const [channels] = useCollection(db.collection("rooms")); //Make use of the collection rooms.
  const [user] = useAuthState(auth); //Firebase hooks is used here to provide user state.
  const [input, setInput] = useState(""); //Hooks in react to set input state
  const addChannel = () => {
    const channelName = input;
    //Whatever input is provided will be stored as channelName in collection "rooms". and then after adding input is again set to empty string.
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
    setInput("");
  };
  return (
    <Link to={"/"}>
      <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo>
            <h2>Boo's fam👻</h2>
            <h3>
              <FiberManualRecordIcon />
              {user?.displayName}
            </h3>
          </SidebarInfo>
          <CreateIcon />
        </SidebarHeader>

        <SidebarOption Icon={InsertCommentIcon} title="threads" />
        <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
        <SidebarOption Icon={DraftsIcon} title="Saved items" />
        <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
        <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
        <SidebarOption Icon={AppsIcon} title="Apps" />
        <SidebarOption Icon={FileCopyIcon} title="File Browser" />
        <SidebarOption Icon={ExpandLessIcon} title="Show less" />
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title="Channel" />
        <hr />
        {/* Extra prop andChannelOption is to add functionality to add channel  */}
        <Button
          hidden
          type="submit"
          onClick={addChannel}
          style={{ color: "white" }}
        >
          Add Channel
        </Button>
        <input
          placeholder={`Please enter channel name`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            backgroundColor: "#49274b",
            color: "white",
            padding: "10px",
            width: "100px",
          }}
        />

        <Channel>
          {/* map through channels in collection and props are passed to sidebarOption component.*/}
          {channels?.docs.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
          ))}
        </Channel>
      </SidebarContainer>
    </Link>
  );
}

export default Sidebar;
//Adding css using styled components.
const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0;
  border-top: 1px solid #49274b;
  min-width: 280px;
  min-height: 780px;
  margin-top: 60px;
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const Channel = styled.div`
  overflow-y: scroll;
  height: 200px;
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    color: #49274b;
    border-radius: 999px;
    padding: 8px;
    font-size: 18px;
    background-color: white;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
