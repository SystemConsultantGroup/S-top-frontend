"use client";
import { PageHeader } from "@/components/common/PageHeader";
import { GalleryEditFrom } from "@/components/pages/GalleryForm";

export default function AdminGalleryEdit({ params }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="갤러리 사진 수정" />

      <GalleryEditFrom galleryID={parseInt(params.id)}></GalleryEditFrom>
    </>
  );
}
