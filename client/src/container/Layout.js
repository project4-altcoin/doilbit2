import React from "react";
import Nav from "../components/Nav";
import BuyOrderForm from "../components/BuyOrderForm";
import SellOrderform from "../components/SellOrderForm";
import Signup from "../components/Signup";
import Bank from "../components/Bank";
import Withdraw from "../components/Withdraw";
import PriceList from "../components/PriceList";

function Layout() {
    return (
        <div class="">
            <header>
                <Nav /> 
            </header>
                <body class="min-h-screen flex justify-center place-content-start place-item-start pt-16 ">
                    <div class="container mx-auto">   
                        <div class="grid grid-cols-3 md:grid-cols-3 gap-4 p-5 ">        
                            <BuyOrderForm />
                            <SellOrderform />
                            <Bank />       
                            <Withdraw />
                        </div>
                        <div class="col-span-1">
                        <Signup />
                        <PriceList />
                        </div>
                    </div>

            </body>
        </div>
    )
}

export default Layout;