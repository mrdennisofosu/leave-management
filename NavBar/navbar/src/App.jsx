import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import RequestLeaveForm from "./Components/RequestLeaveForm/RequestLeaveForm";
import LeaveStatus from "./Components/LeaveStatus/LeaveStatus";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Settings from "./Components/Settings/Settings";
import "./App.css";
import { LeaveProvider } from "./Components/LeaveContext/LeaveContext";

const BlankPage = () => <div className="blank-page"></div>;

const App = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("userToken") // Check authentication on page load
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme; // Apply theme to body
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
    // Apply language changes as needed
  }, [language]);

  return (
    <LeaveProvider>
      <Router>
        <div className={`app ${theme}`}>
          {/* Show Navbar only if user is authenticated */}
          {isAuthenticated && (
            <Navbar
              theme={theme}
              setTheme={setTheme}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
          <div className="content">
            <Routes>
              {/* Redirect users based on authentication */}
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

              {/* Authentication Routes */}
              <Route
                path="/signin"
                element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes (Accessible only if logged in) */}
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
                element={
                  isAuthenticated ? <Settings /> : <Navigate to="/signin" />
                }
              />

              {/* Redirect all unknown routes to Sign In */}
              <Route path="*" element={<Navigate to="/signin" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LeaveProvider>
  );
};

export default App;
