import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"; // important !! 
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
//import SignUp from "./pages/SignUp";


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/*<Route path="/signup" element={<SignUp />} /> */}
 
      {/* à vérifier */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />  {/* besoin du token */}
          </PrivateRoute>
        }
      />

      {/* page 404 */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

//test token plus tard
export default AppRouter;