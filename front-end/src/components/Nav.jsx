import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"

function Nav() {
  // check if users data is in local storage
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  // ----------------------LOGOUT FUNCTION----------------
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  }

  return (
    <div>
      {
        auth ? <ul className='nav-ul'>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Products</Link></li>
          <li><Link to="/update">Update Products</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
        </ul> :
          <ul className='nav-ul nav-right'>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
      }
    </div>
  )
}


// <li>{auth ? <Link to="/signup" onClick={logout}>Logout</Link> :
// <Link to="/signup">Sign Up</Link>}</li>
// <li><Link to="/login">Login</Link></li>




export default Nav