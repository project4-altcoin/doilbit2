import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// 되돌리기

function SellOrderForm() {
    // 임의의 유저아이디 -> 회원가입시 디비에 만들어짐
    const userId = "623943499d5531c4f1bcb8a8";

    const [sellOrder, setSellOrder] = useState({
        sellprice: "",
        sellquantity: "",
        userId: userId
    });
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSellOrder({
            ...sellOrder,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("front sellorder: ", sellOrder);
        axios.post("http://localhost:3001/exchange/trans", sellOrder)
    }

    useEffect(() => {
        setPrice(sellOrder.sellprice);
        setQuantity(sellOrder.sellquantity);
    }, [sellOrder]);

    return (
        
        <div class="flex items-center justify-center">
                <div class="bg-white rounded-lg shadow p-5">
                    <p class="text-gray-700 text-xl font-semibold">
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        매 도 
                        </div>
                        <br />
                        <form class="" action="/exchange/sell" method="post">
                            <label>수량: <input class="bg-green-400 text-black" type="text" name="sellquantity" value={quantity} onChange={handleChange} /></label><br /><br />
                            <label>가격: <input class="bg-green-400 text-black" type="text" name="sellprice" value={price} onChange={handleChange} /></label><br /><br />
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