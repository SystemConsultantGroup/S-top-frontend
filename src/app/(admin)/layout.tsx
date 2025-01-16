import { Metadata } from "next";
import classes from "./layout.module.css";
import { AdminSidebar } from "@/components/pages/AdminSidebar";
import { AuthModule } from "@/components/common/Auth/AuthModule";

export const metadata: Metadata = {
  title: "S-TOP 기술교류회 관리자",
  description: "S-TOP 기술교류회 관리자",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await AuthModule({ userType: ["ADMIN"] });

  return (
    <section className={classes.container}>
      <AdminSidebar />
      <section className={classes.content}>
        <section className={classes.main}>{children}</section>
      </section>
    </section>
  );
}
