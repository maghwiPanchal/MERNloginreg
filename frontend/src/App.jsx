import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./pages/ForgotPassword";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser,setError, setLoading } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setLoading(true));
        try {
          const res = await axios.get("/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(res.data));
        } catch (error) {
          console.error("Fetch user error:", error.response?.status, error.response?.data || error.message);
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            dispatch(setError("Your session has expired. Please log in again."));
            window.location.href = "/login";
          } else {
            dispatch(setError("Unable to fetch user data. Please try again later."));
          }
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return null; 
  }

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/landing" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/landing" /> : <Register />}
        />
        <Route
          path="/landing"
          element={user ? <LandingPage user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;