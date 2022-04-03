import React from "react";
import Layout from "./container/Layout";
import { IdProvider } from "./context/idContext";

const App = () => {
    return (
        <IdProvider>
            <Layout />
        </IdProvider>
    );
}

export default App;