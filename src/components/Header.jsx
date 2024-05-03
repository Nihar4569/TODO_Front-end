import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from "../main";
import toast from 'react-hot-toast';
import axios from 'axios';

function Header() {
  const{isAuthenticated,setIsAuthenticated,loading,setLoading} =useContext(Context);

  const logoutHandler = async(e)=>{
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`,
    {
      withCredentials:true,
    }
  );
    toast.success("Logged Out Successfully");
    setIsAuthenticated(false);
    setLoading(false)
    } catch (error) { 
      toast.error(error.response.data.message+" WARNING Logout request can't be Complete")
      setIsAuthenticated(true)
      setLoading(false)
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
          isAuthenticated? <button className='btn' onClick={logoutHandler} disabled={loading}>Logout</button> :
          <Link to={"/Login"}>Login</Link>
        }
        
      </article>
    </nav>
  )
}

export default Header