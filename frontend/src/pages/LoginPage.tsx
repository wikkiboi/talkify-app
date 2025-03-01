import { useState, FormEvent, ChangeEvent } from "react";
import login from "../api/auth/login";
import { useNavigate } from "react-router-dom";
import register from "../api/auth/register";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    registerPassword: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const action = submitter?.value;

    const isLogin = action === "login";

    // if button login
    const token = isLogin
      ? await login(loginInfo.usernameOrEmail, loginInfo.password)
      : await register(
          registerInfo.username,
          registerInfo.email,
          registerInfo.registerPassword
        );

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      return null;
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "usernameOrEmail" || name === "password") {
      setLoginInfo((prev) => {
        return { ...prev, [name]: value };
      });
    } else {
      setRegisterInfo((prev) => {
        return { ...prev, [name]: value };
      });
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="usernameOrEmail"
          name="usernameOrEmail"
          value={loginInfo.usernameOrEmail}
          onChange={handleChange}
          placeholder="username or e-mail"
        />
        <input
          type="text"
          id="password"
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button value="login">Login</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          value={registerInfo.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="text"
          id="email"
          name="email"
          value={registerInfo.email}
          onChange={handleChange}
          placeholder="e-mail"
        />
        <input
          type="text"
          id="registerPassword"
          name="registerPassword"
          value={registerInfo.registerPassword}
          onChange={handleChange}
          placeholder="password"
        />
        <button value="register">Register</button>
      </form>
    </div>
  );
}
