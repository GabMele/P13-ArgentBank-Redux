// src/components/Dashboard/Dashboard.jsx
/**
 * Dashboard component serves as the main layout for the user's dashboard.
 * 
 * It includes:
 * - The `Welcome` component to greet the user.
 * - The `Accounts` component to display account information.
 * 
 * The layout is styled using `Dashboard.module.scss`.
 */
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
