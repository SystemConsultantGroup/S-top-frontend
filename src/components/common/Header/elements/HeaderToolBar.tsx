import Image from "next/image";
import styles from "../Header.module.css";
import { IconLock } from "@tabler/icons-react";

interface IHeaderToolBarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function HeaderToolBar({ isOpen, setIsOpen }: IHeaderToolBarProps) {
  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.authorization}>
        <IconLock className={styles.lockico} />
        <div>Login</div>
        <div className={styles.dividerlnr} />
        <div>Sign up</div>
      </div>
      <div className={styles.swuniv}>
        <Image
          src="/images/swuniv_logo.png"
          alt="National Center of Excellence in Software"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className={`${styles.hamburger} ${isOpen ? styles.open : ""}`} onClick={toggleHamburger}>
        {[1, 2, 3, 4].map((idx) => (
          <span key={idx}></span>
        ))}
      </div>
    </div>
  );
}
