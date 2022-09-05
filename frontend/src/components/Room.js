import { Button, ButtonGroup } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import RTCPeerConnection from 'rtcpeerconnection'


let localStream = new MediaStream();
let remoteStream = new MediaStream();

var pc, ws


// var RTCPeerConnection = require('rtcpeerconnection');

const Room = () => {



  const startStream = async (el) => {
    console.log(el)
    if (navigator.mediaDevices.getUserMedia) {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      el.srcObject = localStream;

      localStream.getTracks().forEach(track => {
        pc.pc.ontrack(track);
      });
      console.log(localStream.getTracks())
    }
  }
  const servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302'
        ]
      }
    ],
    iceCandidatePoolSize: 10
  }

  // function handleStreamClick() {
  //   console.log('clicked')
  // }

  function toggleStream(type) {
    // if(localVideo.srcObject) {
    //     stopStream(localVideo);
    // }
    // else {
    //     startStream(localVideo);
    // }
    localStream.getTracks().forEach(track => {
      if (track.kind === type)
        track.enabled = !track.enabled;
    })
  }

  useEffect(() => {
    let localVideo = document.getElementById('localVideo');
    let remoteVideo = document.getElementById('remoteVideo');

    ws = new WebSocket('ws://localhost:4000');
    startStream(localVideo);
    return () => {
      ws.off();
    }
  }, [])
  const navigate = useNavigate()
  pc = new RTCPeerConnection(servers);
  let { rid } = useParams()
  pc.addStream(remoteStream)
  pc.onaddStream = (e) => {
    document.getElementById("remoteVideo")
      .srcObject = e.stream
  }
  console.log(pc);
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
              <video autoPlay={true} id='localVideo' muted='muted'></video>
            </div>

            <div className="video-block">
              <div>
                <video autoPlay={true} id="remoteVideo"></video>
              </div>
            </div>
          </div>
          <div className='operate-container'>
            <div className='feature-btn' onClick={() => { toggleStream('video') }}>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn feature-active'>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn' onClick={() => { toggleStream('audio') }}>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn feature-active'>
              <div className='fa-solid'></div>
            </div>
            <div className='end-btn' onClick={handleEndCall}>
              <div className='fa-solid rotate'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Room
