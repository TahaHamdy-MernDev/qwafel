import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  expiresIn: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, expiresIn } = action.payload;
      state.user = user;
      state.token = token;
      state.expiresIn = expiresIn;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresIn = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
