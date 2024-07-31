import Link from "next/link";
import styles from "../Header.module.css";

export function HandoutShortcut() {
  return (
    <div className={styles.shortcuts}>
      <div>
        <Link href="/#">VR 바로가기</Link>
      </div>
      <div>
        <Link href="https://www.skku.edu/skku/index.do">성균관대학교</Link>
        <Link href="https://sw.skku.edu/sw/index.do">소프트웨어융합대학</Link>
        <Link href="https://skb.skku.edu/swuniv/index.do">SW중심대학 사업단</Link>
      </div>
    </div>
  );
}
