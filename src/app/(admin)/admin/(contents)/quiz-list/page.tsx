"use client";
import { DataTableUsage } from "@/components/common/DataTable/DataTableUsage";
import { PageHeader } from "@/components/common/PageHeader";

export default function AdminQuizPage() {
  return (
    <>
      <PageHeader title="퀴즈 제출 목록" />
      <DataTableUsage></DataTableUsage>
    </>
  );
}
