import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Lobby = (props) => {
  const navigate = useNavigate()

  let { rid } = useParams()

  function lobbyToRoom() {
    navigate(`/room/${{ rid }.rid}?attribute=joinee`)
  }

  let localVideo;
  let localStream;

  useEffect(() => {
    (async () => {
      localVideo = document.getElementById('localVideo');
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
  
      localVideo.srcObject = localStream;
    })()

    return () => {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
      localStream = null;
    };

  })

  return (
    <>
      <div className='section lobby-section'>
        <div className='outer-container-864'>
          <div className='video-preview-container'>
            <video autoPlay={true} id='localVideo' muted='muted'></video>
          </div>
          <div className='join-confirm-container medium-title-text'>
            <div className='join-confirm-msg'>Ready to join meet?</div>
            <div className='join-btn large-btn' onClick={lobbyToRoom}>
              <div>Join</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lobby
