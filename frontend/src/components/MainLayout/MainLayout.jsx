// src/components/MainLayout/MainLayout.jsx

import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <>
      <main className={styles.mainLayout}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;