import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ExchangeContext } from "./context/context";
import { ExchangeProvider } from "./src/context/idContext";

function App() {

 const { balance, setBalance } = useState(0);


  return (
    <ExchangeProvider>
    <div>App</div>
    </ExchangeProvider>
  )
}

export default App