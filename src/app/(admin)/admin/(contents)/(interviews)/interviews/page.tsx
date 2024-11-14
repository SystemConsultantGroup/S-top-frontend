"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { InterviewListSection } from "@/components/pages/InterviewListSection";

export default function AdminTalkPage() {
  return (
    <>
      <PageHeader title="대담 영상 관리" />
      <InterviewListSection></InterviewListSection>
    </>
  );
}
