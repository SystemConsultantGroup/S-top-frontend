"use client";

import { MypageInterest } from "./MypageInterest";
import { MypageUserInfo } from "./MypageUserInfo";
import { MypageTable } from "./MypageTable";
import classes from "./MypageView.module.css";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { Role } from "@/types/user";

export function MypageView() {
  const [userType, setUserType] = useState<Role | null>(null);

  const fetchUserType = async () => {
    try {
      const data = await fetcher({ url: "/users/me" });
      setUserType(data.userType); // 유저 타입만 저장
    } catch (error) {
      console.error("Failed to fetch user type:", error);
    }
  };

  useEffect(() => {
    fetchUserType();
  }, []);

  return (
    <div className={classes.container}>
      <MypageUserInfo />
      <MypageInterest />
      {(userType === "COMPANY" || userType === "INACTIVE_COMPANY") && <MypageTable />}
    </div>
  );
}
