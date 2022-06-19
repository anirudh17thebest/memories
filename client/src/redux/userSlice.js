import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    authToken: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.userInfo = action.payload;
      state.authToken = action.payload.token;
    },
    loginFail: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.isFetching = false;
      state.userInfo = null;
      state.authToken = null;
      state.error = false;
    },
    updateStart: (state) => {
      state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.userInfo = action.payload;
    },
    updateFail: (state) => {
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
  updateStart,
  updateSuccess,
  updateFail,
} = userSlice.actions;
export default userSlice.reducer;
