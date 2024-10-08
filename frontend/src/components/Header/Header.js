import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import Dropdown from "./Dropdown";
import "./Header.css";
import logo from "./logo.png";
import home from "./home.png";

const headerButtons = [
  { name: "Lead", items: ["Create Leads"] },
  {
    name: "Lead Details",
    items: [
      "Leads",
      "Report",
      "Find Lead Owner",
      "Search Latest Leads",
      "Multiple Assign",
    ],
  },
  { name: "BI", items: ["BI"] },
  { name: "Change Password", items: ["Change Password"] },
];

function Header() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userId, setUserId] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setUserId(localStorage.getItem("userId"));
  }, []);

 const handleLogout = (e) => {
   // Remove all items stored during login
   localStorage.removeItem("token");
   localStorage.removeItem("loggedInUser");
   localStorage.removeItem("userId");
   localStorage.removeItem("userRole");

   handleSuccess("User Logged out");
   setTimeout(() => {
     navigate("/login", { replace: true });
     window.location.reload();
   }, 1000);
 };
  const handleDocumentClick = (event) => {
    if (!event.target.closest(".dropdown")) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="main-container">
      <img src={logo} alt="Top " className="top-image" />

      <div className="main-header">
        <div className="header-buttons">
          {headerButtons.map((button, index) => (
            <Dropdown
              key={index}
              name={button.name}
              items={button.items}
              isOpen={openDropdown === index}
              toggleDropdown={() => toggleDropdown(index)}
            />
          ))}
        </div>
        <div className="user-info">
          <span className="user-name">{loggedInUser}</span>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <button onClick={() => navigate("/home")} className="btn">
            <img src={home} className="interface"></img>
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Header;
