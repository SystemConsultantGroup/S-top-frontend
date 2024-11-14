import { PagedApiRequestParams, PagedApiResponse } from "./common";

export interface PagedInquiriesRequestParams extends PagedApiRequestParams {
  title?: string;
  sort?: string;
}

export interface Inquiry {
  id: number;
  authorName: string;
  projectId: number;
  projectName: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PagedInquiriesResponse extends PagedApiResponse<Inquiry> {}
