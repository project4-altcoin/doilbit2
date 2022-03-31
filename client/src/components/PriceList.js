import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// pricelist 되돌리기

function PriceList() {
    const [buydata, setBuydata] = useState([]);
    const [selldata, setSelldata] = useState([]);

    // const buyApi = async() => {
    //     const response = await axios.get("http://localhost:3001/exchange/buyapi")
    //      setBuydata(response.data)
         
    // }
    // const sellApi = async() => {
    //     const response = await axios.get("http://localhost:3001/exchange/sellapi")
    //     setSelldata(response.data)
         
    // }



    useEffect(() => {
      //const socket= new WebSocket('ws://127.0.0.1:8082');
      const socket= new WebSocket('ws://49.50.172.129:8082');
                socket.onmessage=(e)=>{ 
                    const buyprice = JSON.parse(e.data).buy
                    setBuydata(buyprice)
                    const sellprice = JSON.parse(e.data).sell
                    setSelldata(sellprice)
                }
    },[]);

    var buyquantity = buydata.map((row, index) => 
    <div>
        <div class="w-full rounded-full h-2.5 " style={{transform: "scalex(-1)"}}>
            <div class="bg-red-600 h-2.5 rounded-full" style={{width: `calc(0.2%*${row.buyquantity})`}}></div>
        </div>
        <td key={index}>{row.buyquantity}</td>
    </div>
            )

    var sellquantity = selldata.map((row, index) => 
    <div>
        
        <td key={index}>
          {row.sellquantity}
          <div class="w-full rounded-full h-2.5 ">
          <div class="bg-blue-600 h-2.5 rounded-full" style={{width: `calc(0.3%*${row.sellquantity})`}}></div>
        </div>
          </td>
    </div>
            )

    var buyprice = buydata.map((row, index) => 
    <div>
        <div class="w-full" style={{transform: "scalex(-1)"}}>
            <div class="h-2.5 rounded-full" ></div>
        </div>
        <td key={index}>{row.buyprice}</td>
        </div>
            )

    var sellprice = selldata.map((row, index) => 
    <div>
     
        <td key={index}>{row.sellprice}</td>
        <div class="w-full" style={{transform: "scalex(-1)"}}>
            <div class="h-2.5 rounded-full" ></div>
        </div>
        </div>
            )


    return (
        <> 
        <div> 
        
        <br />        
        <p style={{color:'black', fontWeight:"bold", fontSize:20}}>요들코인 호가창</p>
        <table class="min-w-full bg-white relative border">
        <thead>
          <tr>
            <th class="sticky top-0 px-6 py-3">수량</th>
            <th class="sticky top-0 px-6 py-3">가격</th>
            <th class="sticky top-0 px-6 py-3">수량</th>
          </tr>
        </thead>
        <tbody class="divide-y bg-blue-100">
          <tr>
            <td class="px-6 py-4 text-center">{sellquantity}</td>
            
            <td class="px-6 py-4 text-center">{sellprice}</td>
            <td></td>
          </tr>
          </tbody>
        <tbody class="divide-y bg-red-100">
          <tr>
              <td></td>
            <td class="px-6 py-4 text-center">{buyprice}</td>
            <td class="px-6 py-4 text-center">{buyquantity}</td>
          </tr>
          </tbody>
        </table>
        </div>
        </>
        );  
}


export default PriceList;