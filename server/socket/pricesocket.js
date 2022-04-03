const axios = require("axios")
const WebSocket = require('ws');
const socket = new WebSocket.Server({
    port:8082
})


const pricesocket = async() => {
      
    function buyApi() {
        return axios.get("http://localhost:3001/exchange/buyapi")
    }
    
    function sellApi() {
        return axios.get("http://localhost:3001/exchange/sellapi")
    }

        await axios
        .all([buyApi(), sellApi()]).then(
        axios.spread((res1, res2) => {
            JSON.stringify({"buy":res1.data, "sell":res2.data})
            socket.clients.forEach(e=> e.send(JSON.stringify({"buy":res1.data, "sell":res2.data})))
        })
    )
    .catch((err) => console.log(err));

    
}

socket.on('connection', (ws, req)=>{
    pricesocket();

    console.log("pricesocket에 client 접속")
    ws.on("message", (msg) => {
        
    })
})

module.exports = pricesocket;