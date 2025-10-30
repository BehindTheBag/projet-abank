import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { clearError, signupUser } from "../redux/authSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupLoading, signupError } = useSelector((s) => s.auth); // state pour le sign up (depuis authSlice)
   
  // state pour les inputs
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    dispatch(clearError());
    const action = await dispatch(
      signupUser({ email, password, firstName, lastName })
    );
    if (signupUser.fulfilled.match(action)) {
      navigate("/login"); // après inscription, on va se connecter
    }
  }

  return (
    <div className="page-container">
      <Header />
      <main className="main bg-dark main-content">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon" />
          <h1>Sign Up</h1>

          <form onSubmit={onSubmit}>
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
            </div>

            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)} required />
            </div>

            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="sign-in-button" disabled={signupLoading}>
              {signupLoading ? "Creat" : "Create account"}  {/* */}
            </button>

            {signupError && <p className="sr-only">{signupError}</p>} {/* vérif */}
          </form>

          <div className="return-button-wrapper">
            <Link to="/login" className="back-button">
              Back to Sign In
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default SignUp;
