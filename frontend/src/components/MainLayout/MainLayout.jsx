// src/components/MainLayout/MainLayout.jsx

import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className={styles.mainLayout}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;