"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { EventPeriodForm } from "@/components/pages/EventPeriodForm";

export default function AdminEventPeriodPage() {
  return (
    <>
      <PageHeader title="이벤트 기간 설정" />
      <EventPeriodForm />
    </>
  );
}
