import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./reducer/fav.reducer";

const store = configureStore({
  reducer: {
    fav: favReducer,
  },
});
export default store;
