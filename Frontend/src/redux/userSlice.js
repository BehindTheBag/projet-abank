import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// pour gerer le profil utilisateur 

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {  // Call récupération profil
    try {
      const res = await api.get("/user/profile"); // réponse serveur attendu
      return res.data.body; // { id, email, firstName, lastName, userName }
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err.message || "Erreur profil";
      return rejectWithValue(`(${status || "?"}) ${msg}`);
    }
  }
);
// pour gerer la modification 

export const updateUserNameServer = createAsyncThunk(   // maj username, call PUT 
  "user/updateUserNameServer",
  async (newUserName, { rejectWithValue }) => {
    try {
      const res = await api.put("/user/profile", { userName: newUserName });
      return res.data.body.userName; // renvoie le nom éditer
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err.message || "Erreur modification";
      return rejectWithValue(`(${status || "?"}) ${msg}`);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,   // Données utilisateur
    loading: false,      // True pendant la récupération
    error: null,         // Erreur de chargement
    updating: false,     // True pendant la mise à jour du nom
    updateError: null,   // Erreur pendant la mise à jour
  },
  reducers: {
    // Reset profil (logout)
    clearUserProfile(state) {
      state.userProfile = null;
      state.error = null;
      state.loading = false;
      state.updating = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null; //efface erreur précédente 
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.userProfile = null;
        state.error = action.payload;
      });

    
    builder
      .addCase(updateUserNameServer.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateUserNameServer.fulfilled, (state, action) => {
        state.updating = false;
        if (state.userProfile) { // changement username existant
          state.userProfile.userName = action.payload;
        }
      })
      .addCase(updateUserNameServer.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearUserProfile } = userSlice.actions;
export default userSlice.reducer;



