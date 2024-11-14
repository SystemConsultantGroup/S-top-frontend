"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewListSection } from "@/components/pages/JobInterviewListSection";

export default function AdminJobFairPage() {
  return (
    <>
      <PageHeader title="잡페어 영상 관리" />
      <JobInterviewListSection></JobInterviewListSection>
    </>
  );
}
