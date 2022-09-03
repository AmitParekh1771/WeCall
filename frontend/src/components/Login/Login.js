import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import './login.css'

const Login = () => {
  const [user, setUser] = useState({})

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
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

    google.accounts.id.prompt()
  }, [])

  return (
    <div className='App'>
      <div id='signInDiv'></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {Object.keys(user).length !== 0 && (
        <div>
          <img src={user.picture} alt='dp' />
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  )
}

export default Login
