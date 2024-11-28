import { PagedApiResponse } from "./common";

export interface ITalkRequestParams {
  year?: string;
  title?: string;
  page?: number;
  size?: number;
}

export interface ITalkContent {
  id: number;
  title: string;
  youtubeId: string;
  year: number;
  talkerBelonging: string;
  talkerName: string;
  favorite: boolean;
  quiz: IQuestions[];
  createdAt: string;
  updatedAt: string;
}

interface IQuestionItem {
  question: string;
  answer: number;
  options: string[];
}

interface IQuestions {
  [key: string]: IQuestionItem;
}

export interface ITalkResponse extends PagedApiResponse<ITalkContent> {}
