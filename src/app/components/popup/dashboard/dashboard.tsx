import { FC } from "react";
import { DashboardHead, SectionTitle } from "../../../../styles";

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
        </div>
    );
};

export default Dashboard;
