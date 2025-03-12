import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const mockUsers = [
  { username: "admin", password: "password", role: "Manager" },
  { username: "devuser", password: "password", role: "Developer" },
  { username: "charlie", password: "password", role: "Developer" },
];

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const matchedUser = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (matchedUser) {
        state.user = matchedUser;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Invalid username or password";
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
