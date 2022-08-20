import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
//As soon as store gets information of state change, it will activate reducer. Functionality added using confugureStore.
export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
