"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewListSection } from "@/components/pages/JobInterviewListSection";

export default function AdminKeySpeechPage() {
  return (
    <>
      <PageHeader title="Key Speech 영상 관리" />
      <JobInterviewListSection
        category="KEY_SPEECH"
        createUrl="/admin/key-speech-create"
        editUrlBase="/admin/key-speech"
      />
    </>
  );
}
