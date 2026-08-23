import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { handleError, handleSuccess } from '../utlis'
import  '../css/Home.css'
import { ToastContainer } from 'react-toastify'
function Home(){
const [loggedUser,setLoggedUser]=useState('')
const [products,setProducts]=useState([])

const navigate=useNavigate()
    useEffect(()=>{
        setLoggedUser(localStorage.getItem('loggedUser'))
    },[])
    const handleLogout=(e)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser')
        handleSuccess("user logout")
        setTimeout(() => {
            navigate('/login')
        }, 1000);
    }
    const fetchProducts=async()=>{
        try{
            const url='http://localhost:8080/products';
            const headers={
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            }
            const response=await fetch(url,headers);
            const result=await response.json();
            console.log(result)
            setProducts(result)
        }
        catch(error){
            handleError(error)
        }
    }
    useEffect(()=>{
        fetchProducts()
    },[])
    return(
      <div className="home-container">
       <h1>{loggedUser}</h1>
        <button  className="logout-btn" onClick={handleLogout}>Logout</button>
        <div>
            {
                products && products.map((item,index)=>(
                    <ul key={index}>
                        <span>{item.name}:{item.prize}</span>
                    </ul>
                ))
            }
        </div>
        <ToastContainer/>
    </div>
    )
}

export default Home;