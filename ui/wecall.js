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



let localStream = new MediaStream();
let remoteStream = new MediaStream();


/**
 * function to start video stream
 * 
 * @param {HTMLVideoElement} el 
 */
async function startStream(el) {
    if(navigator.mediaDevices.getUserMedia) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        el.srcObject = localStream;

        localStream.getTracks().forEach(track => {
            pc.addTrack(track);
        });
        console.log(localStream.getTracks())

    }
}

/**
 * function to stop video stream
 * 
 * @param {HTMLVideoElement} el 
 */
function stopStream(el) {
    const stream = el.srcObject;
    const tracks = stream.getTracks();

    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        track.stop();
    }

    el.srcObject = null;

}


let localVideo = document.getElementById('localVideo');
let remoteVideo = document.getElementById('remoteVideo');
startStream(localVideo);

function toggleStream(type) {
    // if(localVideo.srcObject) {
    //     stopStream(localVideo);
    // }
    // else {
    //     startStream(localVideo);
    // }
    localStream.getTracks().forEach(track => {
        if(track.kind == type)
            track.enabled = !track.enabled;
    })
}
        
pc.addEventListener('track', (ev) => {
    remoteStream.addTrack(ev.track);
    remoteVideo.srcObject = remoteStream;
    console.log(ev)
})


function sendData(data) {
    ws.send(JSON.stringify(data));
}

async function createMeet() {
    sendData({
        type: 'room',
        roomId: 'AMIT'
    });

    pc.onicecandidate = event => {
        console.log('setting offer candidate');
        event.candidate && sendData({ type: 'set_offer_candidate', roomId: 'AMIT', offerCandidate: event.candidate.toJSON() })
    }

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type
    }

    sendData({
        type: 'set_offer',
        roomId: 'AMIT',
        offer
    })
    console.log('after setting offer candidate', pc)
}

ws.addEventListener('open', ev => {
    console.log(ev);
})

ws.addEventListener('message', (ev) => {
    const data = JSON.parse(ev.data);
    
    if(data.type == 'answer_candidate') {
        const candidate = new RTCIceCandidate(data.answerCandidate);
        pc.addIceCandidate(candidate);
    }
    
    if(data.type == 'offer_candidate') {
        const candidate = new RTCIceCandidate(data.offerCandidate);
        pc.addIceCandidate(candidate);
    }

    if(!pc.currentRemoteDescription && data.type == 'answer') {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
    }

    if(!pc.currentRemoteDescription && data.type == 'offer') {
        const offerDescription = new RTCSessionDescription(data.offer);
        pc.setRemoteDescription(offerDescription);
    }
    
})

async function joinMeet() {
    sendData({
        type: 'get_offer',
        roomId: 'AMIT'
    })

    
    if(pc.signalingState != 'have-remote-offer' && pc.signalingState != 'have-local-pranswer') return;
    console.log('before setting remote candidate', pc)


    sendData({
        type: 'get_offer_candidate',
        roomId: 'AMIT'
    })

    pc.onicecandidate = event => {
        console.log('setting answer candidate');
        if(!event.candidate) return;
        sendData({ type: 'set_answer_candidate', roomId: 'AMIT', answerCandidate: event.candidate.toJSON() })
        sendData({ type: 'send_answer_candidate', roomId: 'AMIT', answerCandidate: event.candidate.toJSON() })
    }

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
        sdp: answerDescription.sdp,
        type: answerDescription.type
    }

    sendData({
        type: 'send_answer',
        roomId: 'AMIT',
        answer
    })

    console.log('after setting remote candidate', pc)
}