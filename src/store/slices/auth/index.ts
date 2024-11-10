import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../";

interface AuthData {
  isTwoFactorAuthentication?: boolean;
  tokenType?: string;
  expiresIn?: number;
  token?: string;
}

const initialState: Required<AuthData> = {
  isTwoFactorAuthentication: false,
  tokenType: "",
  expiresIn: 0,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AuthData>) => {
      if (action.payload?.token) {
        localStorage.setItem("token", action.payload?.token);
      }
      Object.assign(state, action.payload);
    },
    removeSession: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
});

export const { setAccessToken, removeSession } = authSlice.actions;

export default authSlice.reducer;

export const accessTokenSelector = (state: RootState) => state.auth.token;
