import { createSlice } from "@reduxjs/toolkit"; 

const initialAuthState = { isUserLoggedIn: false };

const userAuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logIn(state) {
      state.isUserLoggedIn = true;
    },
    signOut(state) {
      state.isUserLoggedIn = false;
    }
  }
});

export const userAuthActions = userAuthSlice.actions;

export default userAuthSlice;
