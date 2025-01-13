"use client";

import { PagedQuizResultRequestParams, PagedQuizResultResponse } from "@/types/quiz";
import useSWR from "swr";

export function useQuizResults({ params }: { params: PagedQuizResultRequestParams }) {
  const result = useSWR<PagedQuizResultResponse>({
    url: "/quizzes/result",
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
