import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

function BuyOrderForm() {
    // 임의의 유저아이디 -> 회원가입시 디비에 만들어짐
    const userId = "623943499d5531c4f1bcb8a8";

    const [buyOrder, setBuyOrder] = useState({
        price: "",
        quantity: "",
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
        axios.post("/exchange/buy", buyOrder)
    };

    useEffect(() => {
        setPrice(buyOrder.price);
        setQuantity(buyOrder.quantity);
    }, [buyOrder]);

    return (
            <div class="relative top-60 flex flex-wrap justify-center">
                <div class="">
                    <div class="bg-white rounded-lg shadow p-5">
                        <p class="text-gray-700 text-xl font-semibold">
                            <form class=""action="/exchange/buy" method="post">
                                <label>수량: <input class="bg-green-400 text-black" type="text" name="quantity" value={quantity} onChange={handleChange}/></label>
                                <label>가격: <input class="bg-green-400 text-black" type="text" name="price" value={price} onChange={handleChange}/></label>
                                <button class="rounded-full py-2 px-3 bg-black text-white" onClick={handleSubmit}>매수</button>
                            </form>
                        </p>
                    </div>
                </div>
            </div>
    )
}

export default BuyOrderForm;