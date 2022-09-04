import React from 'react'

const Navbar = () => {
  let userName = localStorage.getItem('name');
  userName = userName.replace(/['"]+/g,'');
  let profilePic = localStorage.getItem('picture');
  profilePic = profilePic.replace(/['"]+/g,'');

  return (
    <>
      <div className='section nav-section'>
        <div className='outer-container-1360 nav-container'>
          <div className='large-title-text'>WeCall</div>
          <div className='ff'>
            <h3 style={{display:"inline"}}>Logged in as {userName}</h3>
            <img className='profilePic' src={profilePic} />
            <button className='logout-btn'>Logout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
