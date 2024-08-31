"use client";
import { DataTableUsage } from "@/components/common/DataTable/DataTableUsage";
import { PageHeader } from "@/components/common/PageHeader";

export default function AdminFunnelsStatics() {
  return (
    <>
      <PageHeader title="유입 경로 분석" />
      <DataTableUsage></DataTableUsage>
    </>
  );
}
