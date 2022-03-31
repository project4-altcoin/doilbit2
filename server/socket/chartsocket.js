const axios = require("axios")
const WebSocket = require('ws');
const socket = new WebSocket.Server({
    port:8085
})

const chartsocket = async() => {
        // await axios.get("http://localhost:3001/exchange/conclude")
        // .then(res => {
        //     let con = res.data
        //     console.log(con)
        //     socket.clients.forEach(e=> e.send(JSON.stringify(con)))
        // })
        // .catch((err) => console.log(err));
        
        var array = [];
        await axios.get("http://localhost:3001/exchange/currentprice2")
        .then(res => {
            for(let i = 0; i < 10; i++){
                console.log(res.data)
                array.push(res.data[i].conprice)
                
            }
            socket.clients.forEach(e=> e.send(JSON.stringify(array)))
        })
        .catch((err) => console.log(err));
        // array.push(response.data)
        
}

socket.on('connection', (ws, req)=>{
    console.log("chartsocket에 client 접속")
    chartsocket();
})

module.exports = chartsocket