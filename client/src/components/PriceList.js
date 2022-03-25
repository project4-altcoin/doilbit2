import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function PriceList() {
    const [buydata, setBuydata] = useState([]);
    const [selldata, setSelldata] = useState([]);

    const buyApi = async() => {
        const response = await axios.get("http://localhost:3001/exchange/buyapi")
         setBuydata(response.data)
         
    }
    const sellApi = async() => {
        const response = await axios.get("http://localhost:3001/exchange/sellapi")
        setSelldata(response.data)
         
    }

    useEffect(() => {
        buyApi()
        sellApi()
    },[]);

    var buyquantity = buydata.map((row, index) => 
    <div>
        <td key={index}>{row.quantity}</td>
        </div>
            )

    var sellquantity = selldata.map((row, index) => 
    <div>
        <td key={index}>{row.quantity}</td>
        </div>
            )

    var buyprice = buydata.map((row, index) => 
    <div>
        <td key={index}>{row.price}</td>
        </div>
            )

    var sellprice = selldata.map((row, index) => 
    <div>
        <td key={index}>{row.price}</td>
        </div>
            )


    return (
        <>   
        <h1 text-align="center">호가창</h1>
        <br />        
        <table class="relative border">
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
        </>
        );  
}


export default PriceList;