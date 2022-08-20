// importing modules
import React from "react";
import styled from "styled-components";

const Message = ({ message, timestamp, user, userImage }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {user} <span> {new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;
//Adding css using styled components.
const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    width: 50px;
    border-radius: 5px;
    background-color: var(--slack-color);
    padding: 2px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
