"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import classes from "./ProjectDetailInfo.module.css";

interface Props {
  projectId: string;
}

export function ProjectDetailInquiry({ projectId }: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/infodesk/inquiries/write?id=${projectId}`);
  };

  return (
    <div className={classes.SectionInquiry}>
      <Text className={classes.title}>프로젝트 문의</Text>
      <PrimaryButton onClick={handleButtonClick}>프로젝트 문의하기</PrimaryButton>
    </div>
  );
}
