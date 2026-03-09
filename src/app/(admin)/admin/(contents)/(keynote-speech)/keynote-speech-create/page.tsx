"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { InterviewEditFrom } from "@/components/pages/InterviewForm";

export default function AdminKeynoteSpeechCreate() {
  return (
    <>
      <PageHeader title="Keynote Speech 영상 등록" />
      <InterviewEditFrom redirectUrl="/admin/keynote-speech" defaultIsKeynoteSpeech />
    </>
  );
}
