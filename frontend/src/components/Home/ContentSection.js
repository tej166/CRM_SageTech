// ContentSection.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContentSection.css";
import todo from './to-do-list.png';
import create from './create.png';
const ContentSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="content-container">
      <div className="content-box create-lead">
        <div className="section">
          <h2>Create Leads</h2>
          <img src={create} alt="apple" className="icon"></img>
        </div>

        <button onClick={() => handleButtonClick("/leads")}>
          Create Leads
        </button>
      </div>
      <div className="content-box to-do">
        <div className="section">
      
          <h2>To Do's</h2>
          <img src={todo} alt="apple" className="icon"></img>
        </div>

        <button onClick={() => handleButtonClick("/todo")}>To-Do</button>
      </div>
    </div>
  );
};

export default ContentSection;
