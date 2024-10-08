import React from "react";
import { ToastContainer } from "react-toastify";
import "./Home.css";
import Content from "./ContentSection";
import useAuthGuard from "./useAuthGuard";

function Home() {
  useAuthGuard();

  return (
    <div className="home-container">
      <main>
        <Content />
        <h1>Welcome</h1>
        {/* Add your main content here */}
      </main>
      <ToastContainer />
    </div>
  );
}

export default Home;
