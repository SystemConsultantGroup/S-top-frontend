import Image from "next/image";
import Link from "next/link";
import styles from "../Header.module.css";

interface HandoutOverviewProps {
  setIsOpen: (value: boolean) => void;
}

export function HeaderSymbol({ setIsOpen }: HandoutOverviewProps) {
  const handleLinkClick = () => {
    setIsOpen(false); // Handout 창 닫기
  };

  return (
    <Link href="/" className={styles.symbol} onClick={handleLinkClick}>
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
        <span>성균관대학교 </span>
        <br />
        <span>소프트웨어융합대학</span>
      </div>
    </Link>
  );
}
