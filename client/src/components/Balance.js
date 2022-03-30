import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Balance({}) {
    const [balance, setBalance] = useState(0);
    const userId = "623943499d5531c4f1bcb8a8";

    const api = async() => {
        await axios.all([
            axios.get('http://localhost:3001/api/v1/login'),
            axios.get('http://localhost:3001/api/v1/logout')
        ])
        .then(axios.spread((login, logout) => {
            console.log(login);
            console.log(logout);
        }
        ))
        .catch(err => {
            console.log(err);
        }
        );
    };

    useEffect(() => {
        
        //const socket= new WebSocket('ws://49.50.172.129:8081');
        const socket= new WebSocket('ws://49.50.172.129:8081');
        socket.onmessage=(e)=>{ 
            setBalance(e.data)
            console.log(e.data)
        }
        api();
    }, []);

    // useEffect(() => {
    //    axios.post("http://localhost:3001/exchange/balance", { userId })
    //         .then(res => {
    //             console.log(res);
    //             setBalance(res.data.quantity);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, []);

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