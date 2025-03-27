import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import requestSlice from "./slices/requestSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    requests: requestSlice,
  },
});

export default store;
