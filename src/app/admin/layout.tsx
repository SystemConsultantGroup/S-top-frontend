import { AdminSidebarMenu } from "@/components/common/Sidebar";
import { Sidebar } from "@/components/common/Sidebar";
import { Metadata } from "next";
import classes from "./layout.module.css";

export const metadata: Metadata = {
  title: "S-TOP 기술교류회 관리자",
  description: "S-TOP 기술교류회 관리자",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={classes.container}>
      <Sidebar>
        <AdminSidebarMenu />
      </Sidebar>
      <section className={classes.main}>{children}</section>
    </section>
  );
}
