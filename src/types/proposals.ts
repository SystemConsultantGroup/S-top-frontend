import { PagedApiResponse } from "./common";

export interface ProposalsRequestParams {
  scope?: number;
  term?: number;
  page?: number;
  size?: number;
}

export interface Proposals {
  id: number;
  title: string;
  name: string;
  createdDate: string;
}

export interface ProposalsResponse extends PagedApiResponse<Proposals> {}
