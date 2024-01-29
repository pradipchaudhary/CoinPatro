import { FC } from "react";
import {
    DashboardHead,
    SectionTitle,
    DashboardContent,
} from "../../../../styles";
import Footer from "../../common/Footer";

// Images impports

const Dashboard: FC = () => {
    return (
        <div className="pradip-coin-dashboard">
            <DashboardHead className="dashboard-header">
                <SectionTitle> Nepali Coin Tracker</SectionTitle>
            </DashboardHead>

            <DashboardContent className="dashboard-content">
                <h1>BTC</h1>
                <h4>Rs. 5,279,922.69</h4>
            </DashboardContent>
            <Footer />
        </div>
    );
};

export default Dashboard;
