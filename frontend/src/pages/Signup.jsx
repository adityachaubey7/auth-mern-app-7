import { NavLink, useNavigate } from "react-router";
import "../css/Signup.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { handleError, handleSuccess } from "../utlis";
function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
   const navigate=useNavigate()
  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  console.log(signupInfo);
  const signupSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name,email and password are required");
    }
    try {
      const url = "https://auth-mern-app-7-api.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const {success,message,error}=result;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
            navigate('/login')
        }, 2000);
      }
      else if (error){
        const details=error?.details?.[0].message
        handleError(details);
      }
      else if(!success){
        handleError(message)
      }
      console.log(result);

    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={signupSubmit}>
        <h1>Signup</h1>

        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handlechange}
            type="text"
            name="name"
            id="name"
            value={signupInfo.name}
            autoFocus
            placeholder="Enter name"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            type="email"
            id="email"
            value={signupInfo.email}
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
            value={signupInfo.password}
            name="password"
            placeholder="Enter password"
          />
        </div>

        <button type='submit'>Signup</button>

        <span>
          Already have an account?
          <NavLink to="/login"> Login</NavLink>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
export default Signup;
