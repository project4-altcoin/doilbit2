import React from "react";
import { useState, useEffect,  } from "react";

function Balance() {
    const [balance, setBalance] = useState(0);
    const userId = "623943499d5531c4f1bcb8a8";
    
    //axios 부분을 서버쪽(websocket.js)로 넘겨주고 웹소켓 server에서 연결된 client들에게 뿌려준다

    useEffect(() => {
        
        const socket= new WebSocket('ws://127.0.0.1:8081');
        socket.onmessage=(e)=>{ 
            
            setBalance(e.data)
            console.log(e.data)
        }
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