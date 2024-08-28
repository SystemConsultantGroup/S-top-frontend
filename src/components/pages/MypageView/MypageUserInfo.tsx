"use client";

import { useEffect, useState } from "react";
import classes from "./MypageView.module.css";
import { Text } from "@mantine/core";

import { IUser, MockUserData, MockUserTypes } from "./_mock/mock-user";

export function MypageUserInfo() {
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    setUserData(MockUserData);
  }, []);

  return (
    <div className={classes.userInfoContainer}>
      <Text className={classes.title}>회원 정보</Text>
      <div className={classes.rowGroup}>
        <div className={classes.row}>
          <div className={classes.firstCol}>이름</div>
          <div>{userData?.name}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.firstCol}>전화번호</div>
          <div>{userData?.phone}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.firstCol}>이메일</div>
          <div>{userData?.email}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.firstCol}>회원 유형</div>
          {userData?.userType && (
            <div>{MockUserTypes[userData.userType as keyof typeof MockUserTypes]}</div>
          )}
        </div>
        <div className={classes.row}>
          <div className={classes.firstCol}>
            {userData?.userType == "student" ? "학과" : "소속"}
          </div>
          <div>{userData?.affiliation}</div>
        </div>
        <div className={classes.row}>
          {userData?.userType == "student" ? (
            <>
              <div className={classes.firstCol}>학번</div>
              <div>{userData?.studentId}</div>
            </>
          ) : (
            <>
              <div className={classes.firstCol}>직책</div>
              <div>{userData?.position}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
