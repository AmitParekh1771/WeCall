/**
 * function to start video stream
 * 
 * @param {HTMLVideoElement} el 
 */
async function startStream(el) {
    if(navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        el.srcObject = stream;
        console.log(stream.getTracks())
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


let videoEle = document.getElementById('videoElement');
// startStream(videoEle);

function toggleStream() {
    if(videoEle.srcObject) {
        stopStream(videoEle);
    }
    else {
        startStream(videoEle);
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

let pc = new RTCPeerConnection(servers);

let ws = new WebSocket('ws://localhost:4000/123')

ws.addEventListener('open', (ev) => {
    console.log('client connected');
    let msg = JSON.stringify({
        msg: 'hello'
    })
    ws.send(msg)
})

ws.addEventListener('message', (ev) => {
    console.log(ev.data)
})

