"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { InterviewListSection } from "@/components/pages/InterviewListSection";

export default function AdminKeynoteSpeechPage() {
  return (
    <>
      <PageHeader title="Keynote Speech 영상 관리" />
      <InterviewListSection
        createUrl="/admin/keynote-speech-create"
        editUrlBase="/admin/keynote-speech"
        isKeynoteSpeech
      />
    </>
  );
}
