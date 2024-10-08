import React from "react";
import { useNavigate } from "react-router-dom";

function Dropdown({ name, items, isOpen, toggleDropdown }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    let path = "";
    switch (item) {
      case "Create Leads":
        path = "/leads";
        break;
      case "Leads":
        path = "/display";
        break;
      case "Item 3":
        path = "/lead";
        break;
      case "Item A":
      case "Item B":
      case "Item C":
        path = "/lead-details";
        break;
      case "Option X":
      case "Option Y":
      case "Option Z":
        path = "/bi";
        break;
      case "Change Password":
        path = "/reset-password";
        break;
      default:
        break;
    }
    navigate(path);
    toggleDropdown(null); // Close dropdown after navigation
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button onClick={toggleDropdown}>
        {name} <span className="dropdown-arrow">&#9662;</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index} onClick={() => handleClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
