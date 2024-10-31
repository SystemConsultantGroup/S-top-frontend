"use client";

// 임시 타입
import { PagedApplicationsResponse } from "@/types/application";
import { PagedApiRequestParams } from "@/types/common";
import useSWR from "swr";

export function useInquiries({ params }: { params: PagedApiRequestParams }) {
  const result = useSWR<PagedApplicationsResponse>({
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
