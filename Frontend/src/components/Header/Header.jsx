import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import argentBankLogo from "../../../img/argentBankLogo.png";
import { logout } from "../../redux/authSlice";
import { clearUserProfile } from "../../redux/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // lecture du store redux
  const { isLoggedIn } = useSelector((s) => s.auth);  // indique si l'utilisateur est connecté dans cette session
  const user = useSelector((s) => s.user.userProfile); // contient les informations lié au profil 

  // vérification du token pour maintenir la session
  const token = localStorage.getItem("token");
  const connected = isLoggedIn || !!token;

  const handleSignOut = () => {  // Supprime le token du stor & localstorage
    dispatch(logout());
    dispatch(clearUserProfile());
    navigate("/login");  // redirection
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {!connected ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user?.userName || `${user?.firstName || ""} ${user?.lastName || ""}`}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleSignOut}>
             <i className="fa fa-sign-out"></i>
            Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
