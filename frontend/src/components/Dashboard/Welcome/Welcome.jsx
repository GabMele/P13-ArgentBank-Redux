// src/components/Dashboard/Welcome/Welcome.jsx

import { useSelector } from "react-redux";
import styles from "./Welcome.module.scss";

const Welcome = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {  
    return <h2>Loading...</h2>;
  }

  if (user) {
    console.log("✅ Welcome user:", user);
    return (
      <div className={styles.welcome}>
        <h1>
          Welcome back<br />
          {user.firstName} {user.lastName}!
        </h1>
      </div>
    )
  }
};

export default Welcome