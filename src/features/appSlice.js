import { createSlice } from "@reduxjs/toolkit";
//create slice accepts the initial state and state after a action is performed.
//exports reducer to store
export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
