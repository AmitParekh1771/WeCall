import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import image from './images/7070629_3293465.jpg'
import './login.css'

const Login = () => {
  const [user, setUser] = useState({})

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
    localStorage.setItem('name', JSON.stringify(userObject.given_name))
    localStorage.setItem('picture', JSON.stringify(userObject.picture))
    localStorage.setItem('email', JSON.stringify(userObject.email))
    setUser(userObject)
    document.getElementById('signInDiv').hidden = true
  }

  function handleSignOut(event) {
    setUser({})
    document.getElementById('signInDiv').hidden = false
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '926212863062-uiok496ejmb30rkbfgddko4v07umis3g.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    })
    console.log(google.accounts.id);
    google.accounts.id.prompt()
  }, [])

  return (
    <div className='App'>
      <div className="login-section">
      <div className="outer-container-1360 login-block">
        <img
          src={image}
          loading="lazy"
          width="600"
          height="600"
          alt="login-illustration"
          className="login-image"
        />
        <div className="login-box">
          <div className="large-title-text">Hey There!</div>
          <div className="descriptive-text">
            Can't remember username and password!
          </div>
          <div className="descriptive-text">
            No need. Authenticate yourself in one tap.
          </div>
            <div className='flexy'><div id='signInDiv' className='login-btn medium-title-text'></div></div>
        </div>
      </div>
      </div>
      
      {Object.keys(user).length !== 0 && (
          <div>
            <img src={user.picture} alt='dp' />
            <h3>{user.name}</h3>
          </div>
        ) && <Navigate to='/join' />}
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
    </div>
  )
}

export default Login