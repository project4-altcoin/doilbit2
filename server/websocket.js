const axios = require("axios")
const WebSocket = require('ws')
const socket = new WebSocket.Server({
    port:8081
})
function getbalance() {
    const userId = "623943499d5531c4f1bcb8a8";
  
         axios.post("http://localhost:3001/exchange/balance", { userId })
              .then(res => {
                  let test = res.data.quantity;
                  socket.clients.forEach(e=> e.send(test))
              })
              .catch(err => {
                  console.log(err);
              });
}

  socket.on('connection', (ws, req)=>{
    console.log("websocket 접속")
    getbalance();
    ws.on('message', (msg) => {
        console.log(msg)
    })
    
    // ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
    //     if (ws.readyState === ws.OPEN) {
    //       ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
    //     }
    //   }, 3000);

})

module.exports = getbalance;