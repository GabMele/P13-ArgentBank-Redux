// src/components/MainLayout/MainLayout.jsx
/**
 * MainLayout component is the layout wrapper for the main content.
 * 
 * It renders the main container for the app and the nested routes via 
 * `Outlet` from React Router. This layout is typically used for pages 
 * that share a common structure.
 * 
 * - The layout includes the main content area styled via `MainLayout.module.scss`.
 * - The `Outlet` component allows the rendering of nested routes inside the layout.
 */
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <main className={styles.mainLayout}>
      <Outlet />
    </main>
  );
};

export default MainLayout;
