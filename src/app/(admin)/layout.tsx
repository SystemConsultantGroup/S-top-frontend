import { Metadata } from "next";
import classes from "./layout.module.css";
import { ScrollArea } from "@mantine/core";
import { AuthModule } from "@/components/common/Auth/AuthModule";
import { AdminNavbar } from "@/components/pages/AdminNavbarNew";
import { AdminTopbar } from "@/components/pages/AdminTopbarNew";

export const metadata: Metadata = {
  title: "S-TOP 기술교류회 관리자",
  description: "S-TOP 기술교류회 관리자",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await AuthModule({ userType: ["ADMIN"] });

  return (
    <section className={classes.container}>
      <AdminNavbar />
      <section className={classes.content}>
        <AdminTopbar />
        <section className={classes.main}>
          <ScrollArea type="scroll" p="var(--mantine-spacing-xs) var(--mantine-spacing-xl)">
            {children}
          </ScrollArea>
        </section>
      </section>
    </section>
  );
}
