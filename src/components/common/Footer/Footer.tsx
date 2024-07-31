import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { LogoList } from "./LogoList";

export function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.title}>
          <h2>성균관대학교 S-TOP</h2>
          <h3>Sungkyun Tech Open Party(S-TOP)</h3>
        </div>
        <div className={styles.terms}>
          <Link href="/#">개인정보처리방침</Link>
          <div className={styles.dividertnt} />
          <Link href="/#">네티즌윤리규약</Link>
        </div>
        <div className={styles.detail}>
          <span>
            (16419) 경기도 수원시 장안구 서부로 2066 성균관대학교 자연과학캠퍼스 소프트웨어융합대학
          </span>
          <span>Copyright 2024. Sungkyunkwan University All Rights reserved.</span>
        </div>
        <div className={styles.logos}>
          {LogoList.map((logo, index) => (
            <Image key={index} src={logo.src} alt={logo.alt} width={0} height={0} sizes="100vw" />
          ))}
        </div>
      </div>
    </>
  );
}
