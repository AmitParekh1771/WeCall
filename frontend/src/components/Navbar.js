import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  let userName,profilePic
  if(localStorage.getItem('name') != null)
  {
    userName = localStorage.getItem('name');
    userName = userName.replace(/['"]+/g,'');
    profilePic = localStorage.getItem('picture');
    profilePic = profilePic.replace(/['"]+/g,'');
  }
  
  function logIN()
  {
    var innerHTML;
    if(localStorage.getItem('name') != null)
    {
      innerHTML = <div>
        <h3 style={{display:"inline"}}>Logged in as {userName}</h3>
        <img className='profilePic' src={profilePic} />
        <button className='logout-btn' onClick={logOut}><i className='fas fa-sign-out-alt'></i>  Logout</button>
        </div>
    }
    return innerHTML
  }
  const logOut = () =>
  {
    localStorage.clear();
    navigate(``)
    window.location.reload();
  }

  return (
    <>
      <div className='section nav-section'>
        <div className='outer-container-1360 nav-container'>
          <div className='large-title-text'>WeCall</div>
          <div className='ff'>
            {logIN()}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
