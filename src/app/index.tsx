import React, { FC } from "react";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

const App: FC = () => {
    return (
        <div className="pradip_coin_container">
            <Header />
            <div className="content">
                <h1>BTC</h1>
                <h4>Rs. 5,279,922.69</h4>
            </div>
            <Footer />
        </div>
    );
};

export default App;
