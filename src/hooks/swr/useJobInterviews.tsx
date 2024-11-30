"use client";

import { JobInterviewRequestParams, JobInterviewResponse } from "@/types/JobInterview";
import useSWR from "swr";

export function useJobInterviews({ params }: { params: JobInterviewRequestParams }) {
  const result = useSWR<JobInterviewResponse>({ url: "/jobInterviews", query: params });

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
