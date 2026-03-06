"use client";

import Link from "next/link";
import styles from "./TopBanner.module.css";
import { IconArrowRight } from "@tabler/icons-react";

interface TopBannerProps {
  text?: string;
  url?: string;
}

export const TopBanner = ({ text, url }: TopBannerProps) => {
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
