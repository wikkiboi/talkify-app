import { useState, FormEvent, ChangeEvent } from "react";
import login from "../api/auth/login";
import register from "../api/auth/register";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({ usernameOrEmail: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({ username: "", email: "", registerPassword: "" });
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const action = (e.nativeEvent as SubmitEvent).submitter?.value;

    const isLogin = action === "login";
    const token = isLogin
      ? await login(loginInfo.usernameOrEmail, loginInfo.password)
      : await register(registerInfo.username, registerInfo.email, registerInfo.registerPassword);

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
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

        {/* Temporary bypass button
        <button
          onClick={() => {
            localStorage.setItem("token", "mocked-token"); // Set a mocked token
            navigate("/dashboard"); // Navigate directly to the dashboard
          }}
          className="centered-button"
        >
          Bypass Login (Temp)
        </button>*/}
      </div>
    </div>
  );
}
