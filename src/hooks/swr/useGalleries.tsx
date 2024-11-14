"use client";

import { GalleryRequestParams, GalleryResponse } from "@/types/gallery";
import useSWR from "swr";

export function useGalleries({ params }: { params: GalleryRequestParams }) {
  const result = useSWR<GalleryResponse>({ url: "/galleries", query: params });

  return {
    data: result.data?.content,
    pageData: result.data && {
      pageSize: result.data.size,
      pageNumber: result.data.number,
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
    },
    get isLoading() {
      return result.isLoading;
    },
    get error() {
      return result.error;
    },
    get mutate() {
      return result.mutate;
    },
  };
}
