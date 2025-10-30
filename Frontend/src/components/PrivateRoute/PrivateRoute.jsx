import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) { 
  // on vérifie dans Redux si l'utilisateur est connecté
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // on vérifie aussi si un token existe dans le localStorage 
  const token = localStorage.getItem("token");

  // si pas connecté et pas de token, on redirige vers /login
  if (!isLoggedIn && !token) {
    return <Navigate to="/login" replace />;
  }

  // sinon on affiche la page demandée (les children seront protégées)
  return children;
}

export default PrivateRoute;
