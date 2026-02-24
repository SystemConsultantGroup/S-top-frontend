"use client";

import Link from "next/link";
import styles from "./TopBanner.module.css";
import { IconArrowRight } from "@tabler/icons-react";

export const TopBanner = () => {
  const text = process.env.NEXT_PUBLIC_TOP_BANNER_TEXT;
  const url = process.env.NEXT_PUBLIC_TOP_BANNER_URL;

  if (!text) return null;

  const bannerContent = (
    <div className={`${styles.banner} ${!url ? styles.noLink : ""}`}>
      <div className={styles.content}>
        <span>{text}</span>
        {url && <IconArrowRight size={18} className={styles.arrow} />}
      </div>
    </div>
  );

  if (url) {
    return (
      <Link href={url} className={styles.bannerLink}>
        {bannerContent}
      </Link>
    );
  }

  return bannerContent;
};
