"use client";

import styles from "./Header.module.css";
import { useState } from "react";
import { HeaderSymbol } from "./elements/HeaderSymbol";
import { HeaderTopNav } from "./elements/HeaderTopNav";
import { HeaderToolBar } from "./elements/HeaderToolBar";
import { HandoutOverview } from "./elements/HandoutOverview";

import { useAuth } from "../Auth";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className={styles.header} role="banner">
        <HeaderSymbol />
        <HeaderTopNav />
        <HeaderToolBar isOpen={isOpen} setIsOpen={setIsOpen} isLoggedIn={isLoggedIn} />
      </div>
      <div className={`${styles.handout} ${isOpen ? styles.show : ""}`}>
        <HandoutOverview setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
