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
        axios.spread((response1, response2) => {
            JSON.stringify({"buy":response1.data, "sell":response2.data})
            socket.clients.forEach(e=> e.send(JSON.stringify({"buy":response1.data, "sell":response2.data})))
        })
    )
    .catch((err) => console.log(err));
    

    
    

    // const buyApi = async() => {
    //     const response = await axios.get("http://localhost:3001/exchange/buyapi")
    //     .then()
         
    // }
    // const sellApi = async() => {
    //     const response = await axios.get("http://localhost:3001/exchange/sellapi")
    //     setSelldata(response.data)
        
    // }
}

socket.on('connection', (ws, req)=>{
    pricesocket();

    console.log("pricesocket에 client 접속")
    ws.on("message", (msg) => {
        
    })
})

module.exports = pricesocket;