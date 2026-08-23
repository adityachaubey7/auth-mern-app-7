import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/signup" element= {<Signup />} />    
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
