import { NavLink, useNavigate } from "react-router";
import "../css/Signup.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { handleError, handleSuccess } from "../utlis";
function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  console.log(loginInfo);
  const loginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = "https://auth-mern-app-7-api.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", result.token);
        localStorage.setItem("loggedUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else if (error) {
        const details = error?.details?.[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={loginSubmit}>
        <h1>login</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            type="email"
            id="email"
            value={loginInfo.email}
            name="email"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlechange}
            type="password"
            id="password"
            value={loginInfo.password}
            name="password"
            placeholder="Enter password"
          />
        </div>

        <button type="submit">login</button>

        <span>
          don't have an account?
          <NavLink to="/signup"> signup</NavLink>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
export default Login;
