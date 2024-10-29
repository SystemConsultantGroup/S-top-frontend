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

export interface Answers {
  id: string;
  qid: string;
  answer: string;
}

export interface Quiz {
  id: string;
  question: string;
  correct: number;
}

export interface ReqQuiz {
  question: string;
  answer: number;
  optinos: string[];
}

export interface InterviewResponse extends PagedApiResponse<Interview> {}
