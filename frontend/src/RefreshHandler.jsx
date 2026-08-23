import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

function RefreshHandler({setIsAuthenticated}) {
    const location=useLocation();
    const navigate=useNavigate();
 useEffect(()=>{
    if(localStorage.getItem('token')){
        setIsAuthenticated(true);
        if(location.pathname==="/"||
        location.pathname==="/login"||
        location.pathname==="/signup"||
        location.pathname==="/Login"
        ){
            navigate("/home",{replace:false});
        }
    }
 }, [location,navigate,setIsAuthenticated]) 

  return (
   null
  )
}
export default  RefreshHandler