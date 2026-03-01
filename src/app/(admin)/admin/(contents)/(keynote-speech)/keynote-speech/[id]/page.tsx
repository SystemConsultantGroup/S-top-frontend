"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewEditFrom } from "@/components/pages/JobInterviewForm";

export default function AdminKeynoteSpeechEdit({ params }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="Keynote Speech 영상 수정" />
      <JobInterviewEditFrom
        jobInterviewID={Number(params.id)}
        redirectUrl="/admin/keynote-speech"
      />
    </>
  );
}
