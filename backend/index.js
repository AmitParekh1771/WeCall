
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 4000 })

let users = []

function sendData(data, connection) {
    connection.send(JSON.stringify(data));
}
 
function findUser(username) {
    return users.find(user => user.username == username);
}
 
wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
 
        const user = findUser(data.username);
 
        switch(data.type) {
            case "store_user":
                if (user) return;
 
                const newUser = {
                    conn: ws,
                    username: data.username
                }
                users.push(newUser);
                console.log(newUser.username);
                break;

            case "store_offer":
                if (!user) return;
                user.offer = data.offer;
                break;
            
            case "store_candidate":
                if (!user) return;

                if (!user.candidates) user.candidates = [];
                
                user.candidates.push(data.candidate);
                break;

            case "send_answer":
                if (!user) return;
 
                sendData({
                    type: "answer",
                    answer: data.answer
                }, user.conn);
                break;

            case "send_candidate":
                if (!user) return;
 
                sendData({
                    type: "candidate",
                    candidate: data.candidate
                }, user.conn);
                break;

            case "join_call":
                if (!user) return;

                sendData({
                    type: "offer",
                    offer: user.offer
                }, ws)
                
                user.candidates.forEach(candidate => {
                    sendData({
                        type: "candidate",
                        candidate: candidate
                    }, ws)
                })
                break;
        }
    })
 
    ws.on('close', (reason, description) => {
        const index = users.findIndex(user => user.conn == ws);

        users.splice(index, 1);
    })
})
 