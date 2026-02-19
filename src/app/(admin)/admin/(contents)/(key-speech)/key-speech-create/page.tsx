"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewEditFrom } from "@/components/pages/JobInterviewForm";

export default function AdminKeySpeechCreate() {
  return (
    <>
      <PageHeader title="Key Speech 영상 등록" />
      <JobInterviewEditFrom redirectUrl="/admin/key-speech" defaultCategory="KEY_SPEECH" />
    </>
  );
}
