import "@mantine/core/styles.css";
import "@/theme/global.css";
import type { Metadata } from "next";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "S-TOP 기술교류회",
  description: "S-TOP 기술교류회",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <section>{children}</section>
      <Footer />
    </>
  );
}
