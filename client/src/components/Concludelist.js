import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// 거래 체결 내역

function Concludelist() {
  const [concludedata, setConcludedata] = useState([]);

  // const ConcludeApi = async() => {
  //     const response = await axios.get("http://localhost:3001/exchange/conclude")
  //      setConcludedata(response.data)  
  // }

  useEffect(() => {
    // ConcludeApi();
    // const socket= new WebSocket('ws://49.50.172.129:8083');
    const socket= new WebSocket('ws://127.0.0.1:8083');
      socket.onmessage=(e)=>{ 
        const con = JSON.parse(e.data)
        setConcludedata([...con])
      }  
  },[]);

    var conprice = concludedata.map((row, index) => 
    <div>
        <td key={index}>{row.conprice}</td>
        </div>
            )

    var conquantity = concludedata.map((row, index) => 
    <div>
        <td key={index}>{row.conquantity}</td>
        </div>
            )

    var condate = concludedata.map((row, index) => 
    <div>
        <td key={index}>{row.createdAt}</td>
        </div>
            )
    return (
        <> 
        <div> 
        <p style={{color:'black', fontWeight:"bold", fontSize:20}}>요들코인 체결내역</p>
        <br />        
        <table class="min-w-full bg-white">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="text-left py-3 px-4 font-semibold">가격</th>
          <th class="text-left py-3 px-4 font-semibold">수량</th>
          <th class="text-left py-3 px-4 font-semibold">체결 일시</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
      <tr>
        <td class="text-left py-3 px-4">{conprice}</td>
        <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{conquantity}</a></td>
        <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{condate}</a></td>
      </tr>
      </tbody>
        </table>
        </div>
        </>
        );  
}


export default Concludelist;