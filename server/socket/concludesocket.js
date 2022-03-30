const axios = require("axios")
const WebSocket = require('ws');
const socket = new WebSocket.Server({
    port:8083
})

const concludesocket = async() => {
        await axios.get("http://localhost:3001/exchange/conclude")
        .then(res => {
            let con = res.data
            console.log(con)
            socket.clients.forEach(e=> e.send(JSON.stringify(con)))
        })
        .catch((err) => console.log(err));
    
}

socket.on('connection', (ws, req)=>{
    concludesocket();

    console.log("concludesocket에 client 접속")
})

module.exports = concludesocket