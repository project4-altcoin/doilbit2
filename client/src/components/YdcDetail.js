import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function YdcDetail() {

    const [Tquantity, setTquantity] = useState([]);
    const [hp, setHp] = useState([]);
    const [lp, setLp] = useState([]);
    const [cp, setCp] = useState([]);
    let Tq = 0;
    let Tp = 0;

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

    // 모든 거래내역의 거래량 합산
    for(let i = 0; i < Tquantity.length; i++) {
        Tq += Tquantity[i].conquantity
    }
    // 모든 거래내역의 값 합산
    for(let j = 0; j < Tquantity.length; j++) {
        Tp += Tquantity[j].conquantity * Tquantity[j].conprice
    }



    useEffect(() => {
        const socket= new WebSocket('ws://49.50.172.129:8084');
        socket.onmessage=(e)=>{ 
            const detail = JSON.parse(e.data)
            setTquantity(detail.tq)
            setHp(detail.hp)
            setLp(detail.lp)
            setCp(detail.cp)
        }
    },[]);


    var highpricemap = hp.map((row, index) => 
    <div>
        <td key={index}>{row.conprice}</td>
    </div>   
    )

    var lowpricemap = lp.map((row, index) => 
    <div>
        <td key={index}>{row.conprice}</td>
    </div>   
    )

    var currentpricemap = cp.map((row, index) => 
    <div>
        <td key={index}>{row.conprice}</td>
    </div>   
    )


    return (
        <>
        <div class="max-w-2xl mx-auto">

<div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
<div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-bold leading-none text-gray-900 dark:text-white">요들코인(YDC)</h3>
</div>
<div class="flow-root">
    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        현재가
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {currentpricemap}&nbsp;KRW
                </div>
            </div>
        </li>
        <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        고가
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {highpricemap}&nbsp;KRW
                </div>
            </div>
        </li>
        <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        저가
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {lowpricemap}&nbsp; KRW
                </div>
            </div>
        </li>
        <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        총 거래량
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {Tq} &nbsp; YDC
                </div>
            </div>
        </li>
        <li class="pt-3 pb-0 sm:pt-4">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        총 거래대금
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {Tp} &nbsp; KRW
                </div>
            </div>
        </li>
    </ul>
</div>
</div>
</div>
        </>
    )

}

export default YdcDetail;