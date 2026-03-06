import "@mantine/core/styles.css";
import "@/theme/global.css";
import type { Metadata } from "next";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import classes from "./layout.module.css";
export const metadata: Metadata = {
  title: "S-TOP 기술교류회",
  description: "S-TOP 기술교류회",
};

import { TopBanner } from "@/components/common/TopBanner/TopBanner";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topBannerText = process.env.NEXT_PUBLIC_TOP_BANNER_TEXT;
  const topBannerUrl = process.env.NEXT_PUBLIC_TOP_BANNER_URL;

  return (
    <>
      <TopBanner text={topBannerText} url={topBannerUrl} />
      <Header />
      <section className={classes["content-wrapper"]}>{children}</section>
      <Footer />
    </>
  );
}
