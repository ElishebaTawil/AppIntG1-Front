import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "",
    role: "",
    email: "",
    hashedPassword: "",
    isLogged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.hashedPassword = action.payload.hashedPassword;
      state.isLogged = action.payload.isLogged;
    },
    clearUser: (state) => {
      state.name = "";
      state.role = "";
      state.email = "";
      state.hashedPassword = "";
      state.isLogged = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
