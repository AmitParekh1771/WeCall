import { Button, ButtonGroup } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const Room = () => {

  const navigate = useNavigate()
  let { rid } = useParams()

  const search = useLocation().search;
  const attribute = new URLSearchParams(search).get('attribute');

  console.log('my message', rid)

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

  let pc = new RTCPeerConnection(servers);

  let ws = new WebSocket('ws://localhost:4000');


  let localStream;
  let remoteStream;

  let localVideo;
  let remoteVideo;

  pc.ontrack = (ev) => {
      if (ev.streams && ev.streams[0])
          remoteVideo.srcObject = ev.streams[0];
      else {
          if(!remoteStream) {
              remoteStream = new MediaStream();
              remoteVideo.srcObject = remoteStream;
          }
          remoteStream.addTrack(ev.track);
      }
  };


  async function toggleStream(type) {
      if (!localStream) {
          localStream = new MediaStream();
          localVideo.srcObject = localStream;
      }

      let track = localStream.getTracks().find(track => track.kind === type);

      if(!track) {
          const newTrack = (await navigator.mediaDevices.getUserMedia({
              video: type === 'video',
              audio: type === 'audio'
          }))
          .getTracks()
          .find(track => track.kind === type);

          localStream.addTrack(newTrack);
          pc.addTrack(newTrack, localStream);
      }
      else {
          track.enabled = !track.enabled;
      }
  }


  function sendData(data) {
      ws.send(JSON.stringify(data));
  }

  async function createMeet() {
      sendData({
          type: 'room',
          roomId: rid
      });

      pc.onicecandidate = event => {
          console.log('setting offer candidate');
          event.candidate && sendData({ type: 'set_offer_candidate', roomId: rid, offerCandidate: event.candidate.toJSON() })
      }

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
          sdp: offerDescription.sdp,
          type: offerDescription.type
      }

      sendData({
          type: 'set_offer',
          roomId: rid,
          offer
      })
      console.log('after setting offer candidate', pc)
  }

  ws.addEventListener('open', ev => {
      console.log(ev);
  })

  ws.addEventListener('message', (ev) => {
      const data = JSON.parse(ev.data);
      
      if(data.type === 'answer_candidate') {
          const candidate = new RTCIceCandidate(data.answerCandidate);
          pc.addIceCandidate(candidate);
      }
      
      if(data.type === 'offer_candidate') {
          const candidate = new RTCIceCandidate(data.offerCandidate);
          pc.addIceCandidate(candidate);
      }

      if(!pc.currentRemoteDescription && data.type === 'answer') {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
      }

      if(!pc.currentRemoteDescription && data.type === 'offer') {
          const offerDescription = new RTCSessionDescription(data.offer);
          pc.setRemoteDescription(offerDescription);
          joinMeet();
          console.log('getting offer')
      }
      
  })

  function getOfferAndJoin() {
    sendData({
        type: 'get_offer',
        roomId: rid
    })
  }

  async function joinMeet() {
      
    console.log('before setting remote candidate', pc)
      // if(pc.signalingState !== 'have-remote-offer' && pc.signalingState !== 'have-local-pranswer') return;
      console.log('before setting remote candidate', pc)


      sendData({
          type: 'get_offer_candidate',
          roomId: rid
      })

      pc.onicecandidate = event => {
          console.log('setting answer candidate');
          if(!event.candidate) return;
          sendData({ type: 'set_answer_candidate', roomId: rid, answerCandidate: event.candidate.toJSON() })
          sendData({ type: 'send_answer_candidate', roomId: rid, answerCandidate: event.candidate.toJSON() })
      }

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
          sdp: answerDescription.sdp,
          type: answerDescription.type
      }

      sendData({
          type: 'send_answer',
          roomId: rid,
          answer
      })

      console.log('after setting remote candidate', pc)
  }

  function removeAllTracks() {
      localStream.getTracks().forEach(track => {
          track.stop();
      });
      localStream = null;
      remoteStream = null;
  }

  // attach with hangup button
  function closeCall() {
      console.log('clicked')
      navigate(`/join`)
      pc.close();
      removeAllTracks();
  }

  pc.addEventListener('iceconnectionstatechange', ev => {
      if(pc.iceConnectionState == 'disconnected') {
          closeCall();
          // additional code to redirect user to join page
      }
  })

  
  useEffect(() => {
    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');
    
    Promise.all([
      toggleStream('video'),
      toggleStream('audio')
    ]).then(() => {
      if(attribute == 'host')
        createMeet();
      else if(attribute == 'joinee')
        getOfferAndJoin();
    })
  });


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
              <video autoPlay={true} id="remoteVideo"></video>
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
            <div className='end-btn' onClick={closeCall}>
              <div className='fa-solid rotate'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Room
