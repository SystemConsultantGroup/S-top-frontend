import { PagedApiRequestParams, PagedApiResponse } from "./common";

type NoticeArgScope = "title" | "content" | "both" | "author";

export interface PagedNoticesRequestParams extends PagedApiRequestParams {
  terms?: string;
  scope?: NoticeArgScope;
}

export interface Notice {
  id: number;
  title: string;
  hitCount: number;
  fixed: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
  files?: NoticeFile[];
}

interface NoticeFile {
  id: number;
  uuid: string;
  name: string;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface PagedNoticesResponse extends PagedApiResponse<Notice> {}
