import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function Error404() {
  return (
    <div className="page-container">
      <Header />
      <main className="main main-content">
        <h1>404 — Page not found</h1>
        <p>The page doesn’t exist</p>
        <Link to="/" className="sign-in-button">
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Error404;
