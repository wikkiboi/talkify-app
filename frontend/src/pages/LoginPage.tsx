import { useState, FormEvent, ChangeEvent } from "react";
import login from "../api/auth/login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await login(loginInfo.usernameOrEmail, loginInfo.password);

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      return null;
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginInfo((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="user-email"
        name="user-email"
        value={loginInfo.usernameOrEmail}
        onChange={handleChange}
      />
      <input
        type="text"
        id="password"
        name="password"
        value={loginInfo.password}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}
