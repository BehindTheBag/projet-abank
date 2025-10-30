import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// Thunk d'inscription (POST /user/signup)
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      
      return res.data;
    } catch (err) {     // renvoie la réponse pour afficher le message 
      const msg = err?.response?.data?.message || err.message || "Signup failed";
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"), // true si token
  token: localStorage.getItem("token") || null,
  error: null,

  // états signup
  signupLoading: false,
  signupError: null,
  signupSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // token stocké, user validé
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
    },
    // affichage erreur
    loginFail: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.error = action.payload || "Erreur de connexion";
      localStorage.removeItem("token");
    },
    // clear msg err
    clearError: (state) => {
      state.error = null;
      state.signupError = null;
      state.signupSuccess = false;
    },
    // déconnexion
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // gestion du signup
    builder.addCase(signupUser.pending, (state) => {
      state.signupLoading = true;
      state.signupError = null;
      state.signupSuccess = false;
    });
    builder.addCase(signupUser.fulfilled, (state) => {
      state.signupLoading = false;
      state.signupSuccess = true; // création et autorisation de connexion
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.signupLoading = false;
      state.signupError = action.payload || "Erreur d'inscription";
      state.signupSuccess = false;
    });
  },
});

export const { loginSuccess, loginFail, clearError, logout } = authSlice.actions;
export default authSlice.reducer;
