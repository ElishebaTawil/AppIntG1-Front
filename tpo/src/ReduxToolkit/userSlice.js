import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      // Aquí enviamos los datos del usuario al backend para registrar
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      // Obtenemos la respuesta del backend, que debería incluir un accessToken
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  name: "",
  role: "",
  email: "",
  hashedPassword: "",
  isLogged: false,
  status: "idle",
  error: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.hashedPassword = action.payload.password; // Asegúrate de si realmente necesitas esto
      state.isLogged = true; // Podrías marcar al usuario como logueado aquí si es apropiado
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.name = "";
      state.role = "";
      state.email = "";
      state.hashedPassword = "";
      state.isLogged = false;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Selectores (ejemplos)
export const selectUsername = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserRole = (state) => state.user.role;
export const selectUserLoggedStatus = (state) => state.user.isLogged;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
