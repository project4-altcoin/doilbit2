import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Balance() {
    const [balance, setBalance] = useState(0);
    const userId = "623943499d5531c4f1bcb8a8";

    useEffect(() => {

       axios.post("http://localhost:3001/exchange/balance", { userId })
            .then(res => {
                console.log(res);
                setBalance(res.data.quantity);
            })
            .catch(err => {
                console.log(err);
            });
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