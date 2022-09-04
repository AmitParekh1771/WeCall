import { Button, ButtonGroup } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function handleStreamClick() {
  console.log('clicked')
}

const Room = () => {
  const navigate = useNavigate()

  let { rid } = useParams()

  function handleEndCall() {
    console.log('clicked')
    navigate(`/join`)
  }

  let msg = 'whatsapp://send?text=Join the video call using this room id '
  msg = msg + { rid }.rid
  let emailmsg =
    'mailto:?subject=Join the video call&body=Join the video call using this room id '
  emailmsg = emailmsg + { rid }.rid
  return (
    <>
      <ButtonGroup
        variant='text'
        aria-label='text button group'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Button>
          <a href={msg} style={{ color: 'green', textDecoration: 'none' }}>
            <i className='fa-brands fa-whatsapp'></i> Share Via WhatsApp
          </a>
        </Button>
        <Button>
          <a
            href={emailmsg}
            style={{ color: 'blue', textDecoration: 'none' }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fa-solid fa-envelope'></i> Share Via Email
          </a>
        </Button>
      </ButtonGroup>
      <div className='section room-section'>
        <div className='outer-container-1360'>
          <div className='videos-container'>
            <div className='video-block'>
              <div>Video user 1</div>
            </div>
            <div className='video-block'>
              <div>
                <video autoPlay={true} id='videoElement' muted='muted'></video>
              </div>
            </div>
            <div className='video-block'>
              <div>Video user 2</div>
            </div>
          </div>
          <div className='operate-container'>
            <div className='feature-btn' onClick={handleStreamClick}>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn feature-active'>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn'>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn feature-active'>
              <div className='fa-solid'></div>
            </div>
            <div className='end-btn'>
              <div onClick={handleEndCall} className='fa-solid rotate'>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Room
