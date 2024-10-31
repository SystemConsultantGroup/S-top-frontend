"use client";

import { PagedInquiriesRequestParams, PagedInquiriesResponse } from "@/types/inquiry";
import useSWR from "swr";

export function useInquiries({ params }: { params: PagedInquiriesRequestParams }) {
  const result = useSWR<PagedInquiriesResponse>({
    url: "/inquiries",
    query: params,
  });

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
