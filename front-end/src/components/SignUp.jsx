import React, { useState,useEffect } from 'react'
import {json, useNavigate} from "react-router-dom"

const SignUp = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate=useNavigate()
  // do nor show sign up page if it is akready logged in
  useEffect(()=>{
    const auth=localStorage.getItem("user");
    if(auth){
      navigate("/")
    }
  },[])

  // ---------------------------API Call from node and DB---------------------
  const collectData = async () => {
    console.log(name, password, email);
    let result = await fetch("http://localhost:3000/register", {
      method: "post",
      body: JSON.stringify({ name, password, email }),
      headers: {
        "Content-Type": "application/json"
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    navigate("/");
  }

  return (
    <div className='signup'>
      <h1>Register</h1>
      <input placeholder='Enter Name' type='text' className='inputBox' value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder='Enter Email' type='text' className='inputBox' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder='Enter password' type='password' className='inputBox' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='signup-btn' onClick={collectData}>Sign Up</button>
    </div>
  )
}

export default SignUp;
