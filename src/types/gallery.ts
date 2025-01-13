import { PagedApiResponse } from "./common";
import { ApiFile } from "./file";

export interface GalleryRequestParams {
  year?: number;
  month?: number;
  page?: number;
  size?: number;
}

export interface Gallery {
  id: number;
  title: string;
  year: number;
  month: number;
  hitCount: number;
  fixed: boolean;
  createdAt: string;
  updatedAt: string;
  files: ApiFile[];
}

export interface GalleryResponse extends PagedApiResponse<Gallery> {}
