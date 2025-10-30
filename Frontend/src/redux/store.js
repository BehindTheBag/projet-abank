import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

// Point d'entrée Redux
// slices de l'application

export const store = configureStore({
  reducer: {
    auth: authReducer, // connexion / déconnexion / erreurs login
    user: userReducer, // profil utilisateur / chargement / édition username
  },
});
