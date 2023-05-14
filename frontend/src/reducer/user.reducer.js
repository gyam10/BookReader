import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetail: {},
};

export const UserSlicer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserDetail: (state, actions) => {
      console.log("state:", state);
      console.log("action:", actions);
      state.userDetail = actions.payload;
    },
    getUserDetail: (state) => {
      return state.userDetail;
    },
  },
});

export const { setUserDetail, getUserDetail } = UserSlicer.actions;
export default UserSlicer.reducer;
