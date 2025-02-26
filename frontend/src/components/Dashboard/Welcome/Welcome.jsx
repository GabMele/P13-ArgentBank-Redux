// src/components/Dashboard/Welcome/Welcome.jsx

import { useSelector } from "react-redux";
import styles from "./Welcome.module.scss";

const Welcome = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) {  
    return <div>Loading...</div>;
  }

  if (user) {
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