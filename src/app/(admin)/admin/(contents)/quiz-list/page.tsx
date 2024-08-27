"use client";
import { DataTableUsage } from "@/components/common/DataTable/DataTableUsage";

export default function AdminQuizPage() {
  return (
    <>
      <div>
        <h1>퀴즈 제출 목록</h1>
      </div>
      <div>
        <DataTableUsage></DataTableUsage>
      </div>
    </>
  );
}
