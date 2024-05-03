import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Profile() {

  const {isAuthenticated,loading,user} = useContext(Context);
  if(!isAuthenticated) {
    toast.error("Login First")
    return <Navigate to={"/login"}/>
  }
  return loading ? (
    <Loader/>
  ) : (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {isAuthenticated ? <p>Created account at {user.createdAt}</p> : null}
    </div>
  )
}

export default Profile