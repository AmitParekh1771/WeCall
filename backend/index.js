
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 4000 })

let rooms = []

function sendData(data, connection) {
    connection.send(JSON.stringify(data));
}
 
function findRoom(roomId) {
    return rooms.find(room => room.roomId == roomId);
}
 
wss.on('connection', (ws, req) => {
    console.log(rooms);
    ws.on('message', (message) => {
        const data = JSON.parse(message);
 
        const room = findRoom(data.roomId);
 
        switch(data.type) {
            case "room":
                if(room) return;
 
                const newRoom = {
                    connection: ws,
                    roomId: data.roomId
                }
                rooms.push(newRoom);
                console.log(newRoom.roomId);
                break;

            case "set_offer":
                if(!room) return;
                room.offer = data.offer;
                break;
            
            case "get_offer":
                if(!room) return;
                
                sendData({
                    type: 'offer',
                    offer: room.offer
                }, ws);
                break;
            
            case "send_answer":
                if(!room) return;
                
                sendData({
                    type: 'answer',
                    answer: data.answer
                }, room.connection);
                break;

            case "set_offer_candidate":
                if (!room) return;
                room.offerCandidate = data.offerCandidate;
                break;
            
            case "get_offer_candidate":
                if (!room) return;

                sendData({
                    type: 'offer_candidate',
                    offerCandidate: room.offerCandidate
                }, ws);
                break;
            
            case "set_answer_candidate":
                if (!room) return;
                room.answerCandidate = data.answerCandidate;
                break;

            case "send_answer_candidate":
                if (!room) return;

                sendData({
                    type: 'answer_candidate',
                    answerCandidate: data.answerCandidate
                }, room.connection);
                break;
        }
    })
 
    ws.on('close', (reason, description) => {
        const index = rooms.findIndex(room => room.connection == ws);

        rooms.splice(index, 1);
    })
})
 