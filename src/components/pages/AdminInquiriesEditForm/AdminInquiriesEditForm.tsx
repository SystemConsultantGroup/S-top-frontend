"use client";

import { Section } from "@/components/common/Section";
import { useEffect } from "react";

export function AdminInquiriesEditForm({ id }: { id: string }) {
  /* id를 통해 데이터 패칭 */
  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <Section>
      <form></form>
    </Section>
  );
}
