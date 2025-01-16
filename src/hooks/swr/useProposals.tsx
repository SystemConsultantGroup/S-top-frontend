"use client";

import { PagedProposalsRequestParams, PagedProposalsResponse } from "@/types/proposals";
import useSWR from "swr";

export function useProposals({ params }: { params: PagedProposalsRequestParams }) {
  const result = useSWR<PagedProposalsResponse>({ url: "/proposals", query: params });

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
