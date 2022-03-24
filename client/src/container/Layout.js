import React from "react";
import Nav from "../components/Nav";
import BuyOrderForm from "../components/BuyOrderForm";
import SellOrderform from "../components/SellOrderForm";
import NewsFeed from "../components/NewsFeed";
import Bank from "../components/Bank";
import PriceList from "../components/PriceList";

function Layout() {
    return (
        <div>
            <Nav />
            <div class="relative top-80 justify-center flex flex-wrap">
                
                <BuyOrderForm />
                {/* <PriceList /> */}
                <SellOrderform />
                
            </div>
            <Bank />
            <PriceList />
        </div>
    )
}

export default Layout;