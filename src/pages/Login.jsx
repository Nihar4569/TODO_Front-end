import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Context, server } from '../main';

function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const loginHandler=async(e)=>{
    setLoading(true);
    e.preventDefault();
    try {
      const {data} = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      toast.success(data.message)
      setIsAuthenticated(true)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
      setLoading(false)
    }
  }

  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className='login'>
        <section onSubmit={loginHandler}>
            <form>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
                <button type='submit'disabled={loading} >Login</button>
                <h4>Or</h4>
                <Link to={"/Register"}>Sign Up</Link>
            </form>
        </section>
        
    </div>
  )
}

export default Login