"use client";

import { useEffect, useState } from "react";
import classes from "./Mypage.module.css";
import { Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IUser } from "@/types/user";
import { USER_TYPE_LOOKUP_TABLE } from "@/constants/LookupTables";
import { PrimaryButton } from "@/components/common/Buttons";
import { MypageForm } from "./MypageForm";
import { useAuth } from "@/components/common/Auth";
import { fetcher } from "@/utils/fetcher";

export function MypageUserInfo() {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const { isLoggedIn } = useAuth();

  const fetchUserData = async () => {
    const data = await fetcher({ url: "/users/me" });
    setUserData(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const handleUserUpdate = () => {
    close();
    fetchUserData();
  };

  return (
    <>
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
            {userData?.userType && <div>{USER_TYPE_LOOKUP_TABLE[userData.userType]}</div>}
          </div>
          {userData?.userType == "STUDENT" ? (
            <div className={classes.row}>
              <div className={classes.firstCol}>학과</div>
              <div>{userData?.departmentName}</div>
            </div>
          ) : (
            <div className={classes.row}>
              <div className={classes.firstCol}>소속</div>
              <div>{userData?.division}</div>
            </div>
          )}
          <div className={classes.row}>
            {userData?.userType == "STUDENT" ? (
              <>
                <div className={classes.firstCol}>학번</div>
                <div>{userData?.studentNumber}</div>
              </>
            ) : (
              <>
                <div className={classes.firstCol}>직책</div>
                <div>{userData?.position}</div>
              </>
            )}
          </div>
        </div>
        <Group justify="flex-end">
          <PrimaryButton onClick={open}>회원정보 수정</PrimaryButton>
        </Group>
      </div>
      <Modal opened={opened} onClose={close} title="회원정보 수정" centered>
        <MypageForm initialData={userData} onUserUpdate={handleUserUpdate} />
      </Modal>
    </>
  );
}
