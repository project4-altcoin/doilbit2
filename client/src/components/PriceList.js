import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


function PriceList() {
    const [buydata, setBuydata] = useState(0);
    const buyApi = async() => {
        const response = await axios.get("http://localhost:3001/api/buy")
         setBuydata(response.data)
    }

    useEffect(() => {
        buyApi()
    },[]);
    console.log(buydata)
    return(
        <ul className="list-none p-5">
            <li className="">{buydata}</li>
            <li className="">59000000</li>
            <li className="">58000000</li>
            <li className="">57000000</li>
            <li className="">56000000</li>
            <li className="">55000000</li>
            <li className="">54000000</li>
            <li className="">53000000</li>
            <li className="">52000000</li>
            <li className="">51000000</li>
            <li className="">50000000</li>
        </ul>

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