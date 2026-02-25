"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewListSection } from "@/components/pages/JobInterviewListSection";

export default function AdminEntrepreneurshipPage() {
  return (
    <>
      <PageHeader title="창업 영상 관리" />
      <JobInterviewListSection
        category="ENTREPRENEURSHIP"
        createUrl="/admin/entrepreneurship-create"
        editUrlBase="/admin/entrepreneurship"
      />
    </>
  );
}
