import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FilePlus, CalendarCheck, User } from "lucide-react";
import "./Navbar.css";
import logo1 from "../../assets/logo1.png";
import search_icon_light from "../../assets/search-w.png";
import search_icon_dark from "../../assets/search-b.png";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";

const Navbar = ({ theme, setTheme, setIsAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUsername(storedEmail.split("@")[0]);
    }
  }, []);

  const toggleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false); // Update state to remove Navbar
    navigate("/signin", { replace: true }); // Redirect immediately
  };

  return (
    <div className={`navbar ${theme}`}>
      <div className="logo-container">
        <img
          src={logo1}
          alt="Logo"
          className={`logo ${theme === "dark" ? "dark-logo" : ""}`}
        />
        <div className="subscript-text">
          <span>Leave</span>
          <span>Management</span>
        </div>
      </div>

      <div className="menu-button" onClick={toggleMenu}>
        ☰
      </div>

      <div className={`nav-items ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li
            className={activeIndex === 0 ? "active" : ""}
            onClick={() => handleClick(0)}
          >
            <Link to="/request-leave" className="request-leave">
              <FilePlus className="icon" />
              <span>Request Leave</span>
            </Link>
          </li>

          {/* My Leaves Dropdown */}
          <li
            className={`dropdown ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => {
              handleClick(1);
              toggleDropdown();
            }}
          >
            <CalendarCheck className="icon2" />
            <span>My Leaves ▾</span>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/leave-status">Leave Status</Link>
                </li>
                <li>
                  <Link to="/leave-policy">Leave Policy</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Profile Dropdown */}
          <li
            className={`dropdown ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => {
              handleClick(2);
              toggleProfileDropdown();
            }}
          >
            <User className="icon" />
            <span>Profile {username && `(${username})`} ▾</span>
            {profileDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="kan" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <img
          src={theme === "light" ? search_icon_light : search_icon_dark}
          alt="search icon"
        />
      </div>

      <img
        onClick={toggleMode}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt="toggle theme"
        className="toggle"
      />
    </div>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired, // Add this prop
};

export default Navbar;
