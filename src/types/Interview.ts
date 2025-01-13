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

export interface Option {
  id: string;
  qid: string;
  option: string;
}

export interface Answer {
  qid: string;
  answer: number;
}

export interface Quiz {
  id: string;
  question: string;
  answer: number;
  options: string[];
}

export interface ReqQuiz {
  question: string;
  answer: number;
  options: string[];
}

export interface ReqQuiz_id {
  id: string;
  question: string;
  answer: number;
  options: string[];
}

export interface InterviewResponse extends PagedApiResponse<Interview> {}
