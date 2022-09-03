import React from 'react'
import image from './images/7070629_3293465.jpg'
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login'
import "./login.css"


const login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
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
          <GoogleLogin
            clientId="384079295225-lrvhvhgfk9lnpjt2o8k9sctk1nv4v9h7.apps.googleusercontent.com"
            scope="email"
            render={(renderProps) => (
              <Button className='googleButton login-btn' color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                Sign-in with Google
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  )
}

export default login