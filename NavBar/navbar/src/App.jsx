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

import "./App.css";
import { LeaveProvider } from "./Components/LeaveContext/LeaveContext";

const BlankPage = () => <div className="blank-page"></div>;

const App = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("userToken")
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <LeaveProvider>
      <Router>
        <div className={`app ${theme}`}>
          {isAuthenticated && <Navbar theme={theme} setTheme={setTheme} />}
          <div className="content">
            <Routes>
              {/* Redirect to Sign In by default */}
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

              {/* Protected Routes */}
              {isAuthenticated ? (
                <>
                  <Route
                    path="/request-leave"
                    element={<RequestLeaveForm theme={theme} />}
                  />
                  <Route
                    path="/leave-status"
                    element={<LeaveStatus theme={theme} />}
                  />
                  <Route path="/leave-policy" element={<BlankPage />} />
                  <Route path="/profile-settings" element={<BlankPage />} />
                </>
              ) : (
                // Redirect unauthenticated users
                <>
                  <Route path="*" element={<Navigate to="/signin" />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </Router>
    </LeaveProvider>
  );
};

export default App;
