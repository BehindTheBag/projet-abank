import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { clearError, loginFail, loginSuccess } from "../redux/authSlice";

function Login() {
  // état local pour gérer les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // permet l'envoi du succes
  const navigate = useNavigate(); // permet la redirection vers profil après le login 

  // fonction appelée à la soumission du formulaire
  async function handleSubmit(e) {
    e.preventDefault(); // empêche le rechargement de la page
    dispatch(clearError());

    try {
      // appel à l'API
      const res = await api.post("/user/login", { email, password });

      // le token est dans res.data.body.token
      const token = res.data?.body?.token;
      if (!token) throw new Error("Token introuvable dans la réponse");

      // on le garde en mémoire
      localStorage.setItem("token", token);

      // on met à jour le store Redux
      dispatch(loginSuccess({ token }));

      // on redirige vers /profile
      navigate("/profile");
    } catch (err) {
      // si erreur, on l’enregistre dans Redux 
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Erreur de connexion";
      dispatch(loginFail(msg));
    }
  }

  return (
    <div className="page-container">
      <Header />
      <main className="main bg-dark main-content">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>

          {/* test */}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>

            {/* affichage de l'erreur si mauvais identifiants */}
            {auth.error && <p className="form-error">{auth.error}</p>}
          </form>

          {/* ?*/}

           {/* test signup 
          <p className="form-helper">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>*/}

        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
