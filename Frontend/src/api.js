import axios from "axios";

const api = axios.create({

  baseURL: "http://localhost:3001/api/v1",
  headers: { "Content-Type": "application/json" },
});


// Ajoute automatiquement le token à chaque requête si on est connecté
api.interceptors.request.use((config) => { // injecte auto le token (interceptor)
  const token = localStorage.getItem("token"); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

//Crée et configure une instance Axios réutilisable pour l'app
