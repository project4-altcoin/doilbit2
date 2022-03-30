import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// 거래 체결 내역

function Concludelist() {
    const [concludedata, setConcludedata] = useState([]);

    const ConcludeApi = async() => {
        const response = await axios.get("http://localhost:3001/exchange/conclude")
         setConcludedata(response.data)         
    }

    useEffect(() => {
        ConcludeApi()
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
        <p class="text-gray-700 text-xl font-semibold">요들코인 체결내역</p>
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