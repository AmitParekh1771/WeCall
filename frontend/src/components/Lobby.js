import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Lobby = (props) => {

  const navigate = useNavigate();

  let {rid}=useParams()
  
  function lobbyToRoom(){
    
    navigate(`/room/${{rid}.rid}`);
  }

  return (
    <>
      <div className='section lobby-section'>
        <div className='outer-container-864'>
          <div className='video-preview-container'>
            <div>User video preview</div>
          </div>
          <div className='join-confirm-container medium-title-text'>
            <div className='join-confirm-msg'>Ready to join meet?</div>
            <div className='join-btn large-btn'>
              <div onClick={lobbyToRoom}>Join</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lobby
