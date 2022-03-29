import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Balance() {
    const [balance, setBalance] = useState(0);
    const userId = "623943499d5531c4f1bcb8a8";
    
            
    // const ws = useRef(null);

    useEffect(() => {
        // ws.current.onmessage = function (event) {
        //     console.log(event.data);
        //     setBalance(event.data)
        //     };
        const socket= new WebSocket('ws://49.50.172.129:8081');
        socket.onmessage=(e)=>{ 
            
            setBalance(e.data)
            console.log(e.data)
        }
        
            
            
    //    axios.post("http://localhost:3001/exchange/balance", { userId })
    //         .then(res => {
    //             console.log(res);
    //             setBalance(res.data.quantity);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });

    }, []);

    return (
        <div class="flex items-center justify-center bg-green-400">              
        <div class="bg-white rounded-lg shadow p-5">
            <p class="text-gray-700 text-xl font-semibold">
        <h1>Balance</h1>
        <h1>{balance}</h1>
            </p>
            </div>
        </div>

    );
}
export default Balance;