import React from "react";
import logo from "../assets/logo.png";

const WelcomePage = () => {
  return (
    <div className="welcome_page">
      {}
      <img
        src={logo}
        alt="Talkify Logo"
        style={{
          width: "20rem",
          height: "auto", 
          marginBottom: "1rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      />
      
      {}
      <h1
        className="text-3xl font-bold mb-6"
        style={{
          textAlign: "center",
          marginBottom: "1rem"
        }}
      >
        Welcome to Talkify
      </h1>
      
      {}
      <div
        className="login_register"
        style={{
          width: "100%",
          gap: "1rem",
        }}
      >
        {}
        <button className="centered-button">
          Login
        </button>
        
        {}
        <button className="centered-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
