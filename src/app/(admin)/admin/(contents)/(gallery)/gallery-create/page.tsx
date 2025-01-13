"use client";
import { PageHeader } from "@/components/common/PageHeader";
import { GalleryEditFrom } from "@/components/pages/GalleryForm";
export default function AdminGalleryCreate() {
  return (
    <>
      <PageHeader title="갤러리 사진 등록" />
      <GalleryEditFrom></GalleryEditFrom>
    </>
  );
}
