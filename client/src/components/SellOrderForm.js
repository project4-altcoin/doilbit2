import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// 되돌리기

function SellOrderForm() {
    // 임의의 유저아이디 -> 회원가입시 디비에 만들어짐
    const userId = "623943499d5531c4f1bcb8a8";

    const [ordersAll, setOrdersAll] = useState({
        sellprice: "",
        sellquantity: "",
        userId: userId
    });
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrdersAll({
            ...ordersAll,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("front sellorder: ", ordersAll);
        axios.post("http://localhost:3001/exchange/trans", ordersAll).then(res=>{
            // const socket1= new WebSocket('ws://49.50.172.129:8082');
            // const socket2= new WebSocket('ws://49.50.172.129:8083');
            // const socket3= new WebSocket('ws://49.50.172.129:8084');
            const socket= new WebSocket('ws://127.0.0.1:8081');
            const socket1= new WebSocket('ws://127.0.0.1:8082');
            const socket2= new WebSocket('ws://127.0.0.1:8083');
            const socket3= new WebSocket('ws://127.0.0.1:8084');
        })
    }

    useEffect(() => {
        setPrice(ordersAll.sellprice);
        setQuantity(ordersAll.sellquantity);
    }, [ordersAll]);

    return (
        
        <div class="flex items-center justify-center">
                <div class="bg-white rounded-lg shadow p-5">
                    <p class="text-gray-700 text-xl font-semibold">
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        매 도 
                        </div>
                        <br />
                        <form class="" action="/exchange/sell" method="post">
                            <label>수량: <input class="" type="text" name="sellquantity" value={quantity} onChange={handleChange} /></label><br /><br />
                            <label>가격: <input class="" type="text" name="sellprice" value={price} onChange={handleChange} /></label><br /><br />
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <button class="rounded-full py-2 px-3 bg-black text-white" onClick={handleSubmit}>매도하기</button>
                            </div>
                        </form>
                    </p>
                </div>
            </div>
        
    )
}

export default SellOrderForm;