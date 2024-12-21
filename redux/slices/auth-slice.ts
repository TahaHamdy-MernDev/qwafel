import { getAuthToken } from "@/lib/cookies";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const token = getAuthToken();
console.log("ttttttttttttttttttt", token);
const initialState = {
  token: Cookies.get("auth_token") || null,
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
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresIn = null;
    },
  },
});

export const { setCredentials, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
