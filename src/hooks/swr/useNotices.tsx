"use client";

import { PagedNoticesRequestParams, PagedNoticesResponse } from "@/types/notice";
import useSWR from "swr";

export function useNotices({
  params,
  event,
}: {
  params: PagedNoticesRequestParams;
  event?: boolean;
}) {
  const result = useSWR<PagedNoticesResponse>({
    url: event ? "/eventNotices" : "/notices",
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
