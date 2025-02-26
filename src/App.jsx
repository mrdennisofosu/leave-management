import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import RequestLeaveForm from "./Components/RequestLeaveForm/RequestLeaveForm";
import LeaveStatus from "./Components/LeaveStatus/LeaveStatus";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Settings from "./Components/Settings/Settings";
import "./App.css";
import { LeaveProvider } from "./Components/LeaveContext/LeaveContext";
import { ThemeProvider, ThemeContext } from "./Components/Context/ThemeContext";

const BlankPage = () => <div className="blank-page"></div>;

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  // Persist authentication state on refresh
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsAuthChecked(true); // Authentication check completed
  }, []);

  useEffect(() => {
    // Keep authentication state in sync with localStorage
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("userToken") !== null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  if (!isAuthChecked) {
    return <div>Loading...</div>; // Prevent redirect flicker during check
  }

  return (
    <div className={`app ${isAuthPage ? "light-mode" : theme}`}>
      {isAuthenticated && !isAuthPage && (
        <Navbar theme={theme} setIsAuthenticated={setIsAuthenticated} />
      )}
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/request-leave" />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/signin"
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/request-leave"
            element={
              isAuthenticated ? (
                <RequestLeaveForm theme={theme} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/leave-status"
            element={
              isAuthenticated ? (
                <LeaveStatus theme={theme} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/leave-policy"
            element={
              isAuthenticated ? <BlankPage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/profile-settings"
            element={
              isAuthenticated ? <BlankPage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />}
          />

          {/* Redirect all unknown routes to Sign In
          <Route path="*" element={<Navigate to="/signin" />} /> */}
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <LeaveProvider>
      <Router>
        <AppContent />
      </Router>
    </LeaveProvider>
  </ThemeProvider>
);

export default App;
