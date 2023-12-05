// components/layout.tsx

import { Stack } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./styles.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <main className={styles.mainLayout}>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}
