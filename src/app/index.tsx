import React, { FC } from "react";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "../styles";

const App: FC = () => {
    return (
        <Container className="pradip_coin_container">
            <Header />
            <div className="content">
                <h1>BTC</h1>
                <h4>Rs. 5,279,922.69</h4>
            </div>
            <Footer />
        </Container>
    );
};

export default App;
