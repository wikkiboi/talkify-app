import { useState, FormEvent, ChangeEvent } from "react";
import login from "../api/auth/login";
import register from "../api/auth/register";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({ usernameOrEmail: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({ username: "", email: "", registerPassword: "" });
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Ensure submitter is an HTMLButtonElement before accessing value
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const action = submitter?.value; 
  
    if (!action) return; // Prevent errors if submitter is null
  
    const isLogin = action === "login";
    const token = isLogin
      ? await login(loginInfo.usernameOrEmail, loginInfo.password)
      : await register(registerInfo.username, registerInfo.email, registerInfo.registerPassword);
  
    if (token) {
      localStorage.setItem("token", token);
      
      // Show success message
      setSuccessMessage("Login Successful!");
      setErrorMessage(null); // Clear error message, if any

      // Hide the success message after 2 seconds and navigate
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/dashboard");
      }, 2000);
    } else {
      // Show error message if login fails
      setErrorMessage("Username and password are incorrect, please try again.");
      setSuccessMessage(null); // Clear success message, if any

      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name in loginInfo) {
      setLoginInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterInfo((prev) => ({ ...prev, [name]: value }));
    }
  }

  return (
    <div className="welcome_page">
      <img
        src={logo}
        alt="Talkify Logo"
        style={{
          width: "20rem",
          height: "auto",
          marginBottom: "1rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <h1 className="text-3xl font-bold" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Welcome to Talkify
      </h1>

      {/* Success message popup */}
      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            backgroundColor: "green",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        >
          {successMessage}
        </div>
      )}

      {/* Error message popup */}
      {errorMessage && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            backgroundColor: "red",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        >
          {errorMessage}
        </div>
      )}

      <div className="login_register" style={{ width: "100%", gap: "1rem", textAlign: "center" }}>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="form-container">
          <h3 className="form-title">Login</h3>
          <input
            type="text"
            name="usernameOrEmail"
            value={loginInfo.usernameOrEmail}
            onChange={handleChange}
            placeholder="Username or Email"
            className="input-field"
          />
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder="Password"
            className="input-field"
          />
          <button value="login" className="centered-button">
            Login
          </button>
        </form>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="form-container">
          <h3 className="form-title">Register</h3>
          <input
            type="text"
            name="username"
            value={registerInfo.username}
            onChange={handleChange}
            placeholder="Username"
            className="input-field"
          />
          <input
            type="email"
            name="email"
            value={registerInfo.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            name="registerPassword"
            value={registerInfo.registerPassword}
            onChange={handleChange}
            placeholder="Password"
            className="input-field"
          />
          <button value="register" className="centered-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
