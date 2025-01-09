import { PagedApiResponse } from "./common";

export interface QuizResult {
  id: number;
  name: string;
  email: string;
  phone: string;
  successCount: number;
}

export interface PagedQuizResultRequestParams {
  year?: number;
  page: number;
  size: number;
}

export interface PagedQuizResultResponse extends PagedApiResponse<QuizResult> {}
