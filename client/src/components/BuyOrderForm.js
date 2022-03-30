import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
// 되돌리기

function BuyOrderForm() {
    // 임의의 유저아이디 -> 회원가입시 디비에 만들어짐
    const userId = "623943499d5531c4f1bcb8a8";

    const [buyOrder, setBuyOrder] = useState({
        buyprice: "",
        buyquantity: "",
        userId: userId
    });

    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBuyOrder({
            ...buyOrder,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(buyOrder);
        axios.post("http://localhost:3001/exchange/trans", buyOrder).then( ()=>
            {
                const socket= new WebSocket('ws://127.0.0.1:8082');
                const socket2= new WebSocket('ws://127.0.0.1:8083');
            }
            
        )
        
    };

    useEffect(() => {
        setPrice(buyOrder.price);
        setQuantity(buyOrder.quantity);
    }, [buyOrder]); // buyorder 

    return (

                <div class="flex items-center justify-center ">             
                    <div class="bg-white rounded-lg shadow p-5 bg">
                        <p class="text-gray-700 text-xl font-semibold">
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            매 수
                            </div>
                            <br />
                            <form class=""action="/exchange/buy" method="post">
                                <label>수량: <input class="bg-green-400 text-black" type="text" name="buyquantity" value={quantity} onChange={handleChange}/></label><br /><br />
                                <label>가격: <input class="bg-green-400 text-black" type="text" name="buyprice" value={price} onChange={handleChange}/></label> <br /><br />
                                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                <button class="rounded-full py-2 px-3 bg-black text-white" onClick={handleSubmit}>매수하기</button>
                                </div>
                            </form>
                        </p>
                    </div>
                </div>
            
    )
}

export default BuyOrderForm;