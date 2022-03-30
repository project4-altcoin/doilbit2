const axios = require("axios")
const WebSocket = require('ws');
const socket = new WebSocket.Server({
    port:8084
})


const detailsocket = async() => {

    // const totalquantity = async() => {
    //     const response = await axios.get("http://localhost:3001/exchange/totalquantity")
    //     setTquantity(response.data)         
    // }
    // const highprice = async() => {
    //     const response = await axios.get("http://localhost:3001/exchange/highprice") 
    //     setHp(response.data)       
    // }
    // const lowprice = async() => {
    //     const response = await axios.get("http://localhost:3001/exchange/lowprice") 
    //     setLp(response.data)       
    // }

    // const currentprice = async() => {
    //     const response = await axios.get("http://localhost:3001/exchange/currentprice") 
    //     setCp(response.data)       
    // }
      
    function totalquantity() {
    return axios.get("http://localhost:3001/exchange/totalquantity")
    }
    
    function highprice() {
    return axios.get("http://localhost:3001/exchange/highprice")
    }

    function lowprice() {
        return axios.get("http://localhost:3001/exchange/lowprice")
    }

    function currentprice() {
        return axios.get("http://localhost:3001/exchange/currentprice")
    }

        await axios
        .all([totalquantity(), highprice(), lowprice(), currentprice()]).then(
        axios.spread((res1, res2, res3, res4) => {
            const detail = JSON.stringify({"tq":res1.data, "hp":res2.data, "lp":res3.data, "cp":res4.data})
            socket.clients.forEach(e=> e.send(detail))
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
    detailsocket();

    console.log("detailsocket에 client 접속")
    ws.on("message", (msg) => {
        
    })
})

module.exports = detailsocket;