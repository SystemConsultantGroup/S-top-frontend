"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { GalleryListSection } from "@/components/pages/GalleryListSection";

export default function AdminGalleryPage() {
  return (
    <>
      <PageHeader title="갤러리 관리" />
      <GalleryListSection></GalleryListSection>
    </>
  );
}
