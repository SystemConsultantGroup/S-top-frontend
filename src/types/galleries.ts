import { PagedApiResponse } from "./common";

export interface IGalleryRequestParams {
  year?: string;
  month?: string;
  page?: number;
  size?: number;
}

export interface IGalleryContent {
  id: number;
  title: string;
  year: number;
  month: number;
  hitCount: number;
  createdAt: string;
  updatedAt: string;
  files: IFiles[];
}

interface IFiles {
  id: number;
  uuid: string;
  name: string;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGalleryResponse extends PagedApiResponse<IGalleryContent> {}
