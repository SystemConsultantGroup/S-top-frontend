"use client";

import { InterviewRequestParams, InterviewResponse } from "@/types/Interview";
import useSWR from "swr";

export function useInterviews({ params }: { params: InterviewRequestParams }) {
  const result = useSWR<InterviewResponse>({ url: "/talks", query: params });

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
