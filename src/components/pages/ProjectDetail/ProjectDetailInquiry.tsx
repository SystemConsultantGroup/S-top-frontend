"use client";

import { Text } from "@mantine/core";
import classes from "./ProjectDetailInfo.module.css";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/common/Buttons";

interface Props {
  projectId: string;
}

export function ProjectDetailInquiry({ projectId }: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/infodesk/inquries/write?id=${projectId}`);
  };

  return (
    <div className={classes.SectionInquiry}>
      <Text className={classes.title}>프로젝트 문의</Text>
      <PrimaryButton onClick={handleButtonClick}>프로젝트 문의하기</PrimaryButton>
    </div>
  );
}
