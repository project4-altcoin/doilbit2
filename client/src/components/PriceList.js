import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// pricelist 되돌리기

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
        <td key={index}>{row.buyquantity}</td>
        </div>
            )

    var sellquantity = selldata.map((row, index) => 
    <div>
        <td key={index}>{row.sellquantity}</td>
        </div>
            )

    var buyprice = buydata.map((row, index) => 
    <div>
        <td key={index}>{row.buyprice}</td>
        </div>
            )

    var sellprice = selldata.map((row, index) => 
    <div>
        <td key={index}>{row.sellprice}</td>
        </div>
            )


    return (
        <> 
        <div> 
        <p class="text-gray-700 text-xl font-semibold">요들코인 호가창</p>
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
        </div>
        </>
        );  
}


export default PriceList;