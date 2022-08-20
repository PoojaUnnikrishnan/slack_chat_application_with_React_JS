//importing necessary icons and modlules.
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import Picker from "emoji-picker-react";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const [showPicker, setShowPicker] = useState(false);
  const sendMessage = (e) => {
    e.preventDefault(); //prevent refresh.

    if (!channelId) {
      return false;
    }
    if (!input) {
      return false;
    }
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //To set timing according to different countries.
      user: user.displayName,
      userImage: user.photoURL,
    });
    chatRef.current.scrollIntoView({ behavior: "smooth" });
    setInput("");
  };
  const onEmojiClick = (event, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <ChatInputContainer>
      {/* Adding emoji */}
      <Pickemoji>
        {showPicker && (
          <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}
      </Pickemoji>
      <form>
        <Inputcontainer>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />

          <img
            className="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker((val) => !val)}
            alt="Emojis"
          />

          <Button hidden type="submit" onClick={sendMessage}>
            SEND
          </Button>
        </Inputcontainer>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;
//Adding css using styled components.
const ChatInputContainer = styled.div`
  border-radius: 30px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
`;
const Pickemoji = styled.div`
  margin: 0;
`;
const Inputcontainer = styled.div`
  position: fixed;
  bottom: 30px;
  display: flex;

  > input {
    width: 800px;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > button {
    display: none !important;
  }
  > img {
    padding: 10px;
    width: 40px;
  }
`;
