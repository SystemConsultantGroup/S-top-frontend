"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewEditFrom } from "@/components/pages/JobInterviewForm";

export default function AdminKeynoteSpeechCreate() {
  return (
    <>
      <PageHeader title="Keynote Speech 영상 등록" />
      <JobInterviewEditFrom redirectUrl="/admin/keynote-speech" defaultCategory="KEYNOTE_SPEECH" />
    </>
  );
}
