"use client";

import { Text } from "@mantine/core";
import classes from "./ProjectDetailInfo.module.css";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/common/Buttons";

export function ProjectDetailInquiry() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/infodesk/inquries");
  };

  return (
    <div className={classes.SectionInquiry}>
      <Text className={classes.title}>프로젝트 문의</Text>
      <PrimaryButton onClick={handleButtonClick}>문의 게시판으로 이동</PrimaryButton>
    </div>
  );
}
