import React from "react";
import Nav from "../components/Nav";
import BuyOrderForm from "../components/BuyOrderForm";
import SellOrderform from "../components/SellOrderForm";
import Signup from "../components/Signup";
import Bank from "../components/Bank";
import Withdraw from "../components/Withdraw";
import Balance from "../components/Balance";
import Concludelist from "../components/Concludelist";
import PriceList from "../components/PriceList";
import YdcDetail from "../components/YdcDetail"
import Footer from "../components/Footer";
import YDCChart from "../components/Chart";



function Layout() {
    return (
        <div >
            <header>
                <Nav /> 
            </header>
                <body class="min-h-screen flex justify-center place-content-start place-item-start pt-16" style={{backgroundColor:"#F1FCEC"}}>
                    <div class="container mx-auto">
                        <YDCChart />
                        <div class="grid grid-cols-5 md:grid-cols-5 gap-4 p-5 ">        
                            <BuyOrderForm />
                            <SellOrderform />
                            <Bank />  
                            <Withdraw /> 
                            <Balance />
                            </div>
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>  
                            <YdcDetail />
                            <div style={{margin:"120px", marginBottom:"155px"}}>                  
                            <PriceList />
                            </div>
                            <div style={{margin:"130px", marginBottom:"195px"}}>
                                <Concludelist />
                        </div> 
                    </div>                                                          
                    </div>
            </body>
            <footer>
                <Footer />
            </footer>

        </div>
    )
}

export default Layout;