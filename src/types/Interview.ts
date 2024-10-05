import { PagedApiResponse } from "./common";

export interface InterviewRequestParams {
  title?: string;
  youtubeId?: string;
  year?: number;
  month?: number;
  page?: number;
  size?: number;
}

export interface Interview {
  id: number;
  title: string;
  youtubeId: string;
  year: number;
  talkerBelonging: string;
  talkerName: string;
  favorite: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: number;
  question: string;
  answer: number;
  options: string[];
}

export interface InterviewResponse extends PagedApiResponse<Interview> {}
