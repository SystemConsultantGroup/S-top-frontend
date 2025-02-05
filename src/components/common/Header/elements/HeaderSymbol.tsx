import Image from "next/image";
import Link from "next/link";
import styles from "../Header.module.css";

export function HeaderSymbol() {
  return (
    <Link href="/" className={styles.symbol}>
      <div className={styles.logo}>
        <Image
          src="/images/S-TopLogo.png"
          alt="Sungkyun Technology Open Party"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className={styles.dividerlnt} />
      <div className={styles.title}>
        <h1>S-TOP</h1>
        <span>성균관대학교 소프트웨어융합대학</span>
      </div>
    </Link>
  );
}
