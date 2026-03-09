"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { InterviewEditFrom } from "@/components/pages/InterviewForm";

export default function AdminKeynoteSpeechEdit({ params }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="Keynote Speech 영상 수정" />
      <InterviewEditFrom
        interviewID={Number(params.id)}
        redirectUrl="/admin/keynote-speech"
        defaultIsKeynoteSpeech
      />
    </>
  );
}
