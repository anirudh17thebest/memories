import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postInfo: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    postStart: (state, action) => {
      state.isFetching = true;
    },
    postSuccess: (state, action) => {
      state.isFetching = false;
      state.postInfo = action.payload;
    },
    postFail: (state, action) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const { postStart, postSuccess, postFail } = postSlice.actions;

export default postSlice.reducer;
