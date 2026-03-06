"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewEditFrom } from "@/components/pages/JobInterviewForm";

export default function AdminEntrepreneurshipCreate() {
  return (
    <>
      <PageHeader title="창업 영상 등록" />
      <JobInterviewEditFrom
        redirectUrl="/admin/entrepreneurship"
        defaultCategory="ENTREPRENEURSHIP"
      />
    </>
  );
}
