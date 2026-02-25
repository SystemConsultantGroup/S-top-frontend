"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewEditFrom } from "@/components/pages/JobInterviewForm";

export default function AdminKeySpeechEdit({ params }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="Key Speech 영상 수정" />
      <JobInterviewEditFrom jobInterviewID={Number(params.id)} redirectUrl="/admin/key-speech" />
    </>
  );
}
