"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewEditFrom } from "@/components/pages/JobInterviewForm";

export default function AdminEntrepreneurshipEdit({ params }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="창업 영상 수정" />
      <JobInterviewEditFrom
        jobInterviewID={Number(params.id)}
        redirectUrl="/admin/entrepreneurship"
      />
    </>
  );
}
