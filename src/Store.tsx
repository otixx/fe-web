import { configureStore,combineReducers } from "@reduxjs/toolkit";
import ProfileSlice from "./feature/Profile/ProfileSlice";
const rootReducer = combineReducers({
    profile: ProfileSlice,
  });
const store = configureStore({
reducer: {
    reducer: rootReducer,
}
})

export default store