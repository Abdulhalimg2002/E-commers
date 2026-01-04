import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cookieService from "../../../service/cookies";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: {
    id: number;
    name: string;
    type: string;
  };
}

interface AuthUser {
  jwt: string;
  user: UserData | null;
}

interface AuthState {
  user: AuthUser | null;
}

// 🔥 اقرأ التوكن من Cookie
const token = cookieService.getToken();

const initialState: AuthState = {
  user: token ? { jwt: token, user: null } : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      cookieService.setToken(action.payload.jwt);
    },

    logout(state) {
      state.user = null;
      cookieService.removeToken();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
