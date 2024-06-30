import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "",
  role: "",
  isLogged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isLogged = action.payload.isLogged;
    },
    clearUser: (state) => {
      state.name = "";
      state.role = "";
      state.isLogged = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
