"use client";

import styles from "./Header.module.css";
import { useState } from "react";
import { HeaderSymbol } from "./elements/HeaderSymbol";
import { HeaderTopNav } from "./elements/HeaderTopNav";
import { HeaderToolBar } from "./elements/HeaderToolBar";
import { HandoutOverview } from "./elements/HandoutOverview";
import { HandoutShortcut } from "./elements/HandoutShortcut";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.header} role="banner">
        <HeaderSymbol />
        <HeaderTopNav />
        <HeaderToolBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className={`${styles.handout} ${isOpen ? styles.show : ""}`}>
        <HandoutOverview />
        <HandoutShortcut />
      </div>
    </>
  );
}
