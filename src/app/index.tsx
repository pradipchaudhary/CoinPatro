import React, { FC } from "react";
import { Container } from "../styles";
import { Dashboard } from "./components/popup";

const App: FC = () => {
    return (
        <Container className="pradip_coin_container">
            <Dashboard />
        </Container>
    );
};

export default App;
