// src/components/Dashboard/Dashboard.jsx

import Accounts from "./Accounts/Accounts.jsx";
import Welcome from "@/components/Welcome/Welcome.jsx";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}> 
      <Welcome /> 
      <Accounts /> 
    </div>
  );
};

export default Dashboard; 