import { FC } from "react";
import { DashboardHead, SectionTitle } from "../../../../styles";
import Footer from "./footer/footer";

// Images impports

const Dashboard: FC = () => {
    return (
        <div className="pradip-coin-dashboard">
            <DashboardHead className="dashboard-header">
                <SectionTitle> Nepali Coin Tracker</SectionTitle>
            </DashboardHead>

            <div className="content">
                <h1>BTC</h1>
                <h4>Rs. 5,279,922.69</h4>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
