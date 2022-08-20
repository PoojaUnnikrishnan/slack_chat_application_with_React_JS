//importing necessary components, icons, hooks and modlules.
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlineIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
const Chat = () => {
  const chatRef = useRef(null);
  // useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). 
  // The returned object will persist for the full lifetime of the component.
  const roomId = useSelector(selectRoomId);
  // This is redux command to get data from store 
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  // this is to fetch messages and details of the sender to collection room.
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  // useCollection is firebase hook use to access the collection room.
  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);
// It scrolls down to the bottom of chat every time u open it new channel
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <Headerleft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlineIcon />
            </Headerleft>
            <Headerright>
              <p>
                <InfoOutlineIcon /> Details
              </p>
            </Headerright>
          </Header>
          <ChatMessages>
            {/* Map through messages and time, message user and image corresponding to it are displayed  */}
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}

            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <Inputmsg>
            <ChatInput
              chatRef={chatRef}
              channelName={roomDetails?.data().name}
              channelId={roomId}
            />
          </Inputmsg>
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;
//Adding css using styled components.
const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
const Header = styled.div`
  position: fixed;
  top: 65px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 1200px;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const Headerleft = styled.div`
  display: flex;
  align-items: center;
  h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;
const Headerright = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  margin-top: 60px;
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
`;

const Inputmsg = styled.div`
  position: sticky;
  bottom: 20px;
`;
