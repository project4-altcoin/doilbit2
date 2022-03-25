import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


function PriceList() {
    const [buydata, setBuydata] = useState([]);
    const buyApi = async() => {
        const response = await axios.get("http://localhost:3001/exchange/buyapi")
         setBuydata(response.data)
    }

    useEffect(() => {
        buyApi()
    },[]);

    const BD = JSON.stringify(buydata)
    console.log(BD)
    return(
        // <ul className="list-none p-5">
        //     <li className=""></li>
        //     <li className="">59000000</li>
        //     <li className="">58000000</li>
        //     <li className="">57000000</li>
        //     <li className="">56000000</li>
        //     <li className="">55000000</li>
        //     <li className="">54000000</li>
        //     <li className="">53000000</li>
        //     <li className="">52000000</li>
        //     <li className="">51000000</li>
        //     <li className="">50000000</li>
        // </ul>
        <table class="table-fixed">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>

        //rounded-lg shadow p-1


        // <div className="bg-white rounded-lg shadow p-10">
        //     <div className="bg-white rounded-lg shadow p-2">1000000000000000</div>
        //     <div className="bg-white rounded-lg shadow p-2">2</div>
        //     <div className="bg-white rounded-lg shadow p-2">3</div>
        //     <div className="bg-white rounded-lg shadow p-2">4</div>
        //     <div className="bg-white rounded-lg shadow p-2">5</div>
        //     <div className="bg-white rounded-lg shadow p-2">6</div>
        //     <div className="bg-white rounded-lg shadow p-2">7</div>
        //     <div className="bg-white rounded-lg shadow p-2">8</div>
        //     <div className="bg-white rounded-lg shadow p-2">9</div>
        //     <div className="bg-white rounded-lg shadow p-2">10</div>
        // </div>
    )
}


export default PriceList;