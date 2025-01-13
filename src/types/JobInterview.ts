import { PagedApiResponse } from "./common";

export interface JobInterviewRequestParams {
  title?: string;
  youtubeId?: string;
  year?: number;
  month?: number;
  page?: number;
  size?: number;
}

export interface JobInterview {
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

export interface JobInterviewResponse extends PagedApiResponse<JobInterview> {}
