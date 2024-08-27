"use client";
import { DataTableUsage } from "@/components/common/DataTable/DataTableUsage";

export default function AdminFunnelsStatics() {
  return (
    <>
      <div>
        <h1>유입 경로 분석</h1>
      </div>
      <div>
        <DataTableUsage></DataTableUsage>
      </div>
    </>
  );
}
