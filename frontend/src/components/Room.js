import { Button } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

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
      <button>
        <a href={msg}>Share Via WhatsApp</a>
      </button>
      <button>
        <a href={emailmsg} target='_blank'>
          Share via Email
        </a>
      </button>
      <div className='section room-section'>
        <div className='outer-container-1360'>
          <div className='videos-container'>
            <div className='video-block'>
              <div>Video user 1</div>
            </div>
            <div className='video-block'>
              <div>Video user 2</div>
            </div>
          </div>
          <div className='operate-container'>
            <div className='feature-btn'>
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
