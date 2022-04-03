const axios = require("axios")
const WebSocket = require('ws');
const socket = new WebSocket.Server({
    port:8081
})

function getbalance() {
    const userId = "623943499d5531c4f1bcb8a8";
        axios.post("http://localhost:3001/exchange/balance", {userId})
            .then(res => {
                let balance = res.data.quantity;
                socket.clients.forEach(e=> e.send(balance)) //연결된 client들에게 balance 뿌려줌
            })
            .catch(err => {
                console.log(err);
            });
}

socket.on('connection', (ws, req)=>{
    console.log("balancesocket에 client 접속")
    getbalance();
})

module.exports = getbalance;