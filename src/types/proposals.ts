import { PagedApiRequestParams, PagedApiResponse } from "./common";

export interface PagedProposalsRequestParams extends PagedApiRequestParams {
  title?: string;
  sort?: string;
}

export interface Proposal {
  id: number;
  authorName: string;
  projectId: number;
  projectName: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PagedProposalsResponse extends PagedApiResponse<Proposal> {}
