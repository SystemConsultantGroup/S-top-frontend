"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewListSection } from "@/components/pages/JobInterviewListSection";

export default function AdminKeynoteSpeechPage() {
  return (
    <>
      <PageHeader title="Keynote Speech 영상 관리" />
      <JobInterviewListSection
        category="KEYNOTE_SPEECH"
        createUrl="/admin/keynote-speech-create"
        editUrlBase="/admin/keynote-speech"
      />
    </>
  );
}
