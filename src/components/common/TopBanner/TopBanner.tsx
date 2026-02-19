"use client";

import Link from "next/link";
import styles from "./TopBanner.module.css";
import { IconArrowRight } from "@tabler/icons-react";

export const TopBanner = () => {
  return (
    <Link href="/key-speech" className={styles.bannerLink}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <span>2026 삼성전자 DX 부문장 Key Speech 보러가기</span>
          <IconArrowRight size={18} className={styles.arrow} />
        </div>
      </div>
    </Link>
  );
};
