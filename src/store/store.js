import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../store/reducers/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});