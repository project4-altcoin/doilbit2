import React from "react";
import Nav from "../components/Nav";
import BuyOrderForm from "../components/BuyOrderForm";
import SellOrderform from "../components/SellOrderForm";
import NewsFeed from "../components/NewsFeed";
import Bank from "../components/Bank";

function Layout() {
    return (
        <div>
            <Nav />
            <div class="relative top-80 justify-center flex flex-wrap">
                <BuyOrderForm />
                <SellOrderform />
                
            </div>
            <Bank />
        </div>
    )
}

export default Layout;