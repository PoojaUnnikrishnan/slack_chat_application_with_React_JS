//importing necessary  modlules.
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
function SidebarOption({ Icon, title, andChannelOption, id }) {
  //Destructuring props
  const dispatch = useDispatch();

  const selectChannel = () => {
    // An action 'Enterroom' is dispatched, which provides unique id
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SideOptionContainer onClick={selectChannel}>
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {/* Take in an icon and renders it  */}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>⛾</span> {title}
        </SidebarOptionChannel>
      )}
      {/* if Icon is passed then the title corresponding to it should be rendered.  */}
    </SideOptionContainer>
  );
}

export default SidebarOption;
//Adding css using styled components.
const SideOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  color: white;
  :hover {
    background-color: #340e36;
    opacity: 0.9;
  }
  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
