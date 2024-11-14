"use client";
import { PageHeader } from "@/components/common/PageHeader";
import { AdminQuizListSection } from "@/components/pages/AdminQuizListSection/AdminQuizListSection";

export default function AdminQuizPage() {
  return (
    <>
      <PageHeader title="퀴즈 제출 목록" />
      <AdminQuizListSection />
    </>
  );
}
