import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { store } from './redux/store';
import "./styles/main.css";

// Importation des styles


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>  {/* permet à redux d'être accesible à tous les composants */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);