import { ComboboxItem } from "@mantine/core";
import { ChangeEvent } from "react";

/** Noticeboard Types */
interface INoticeClassifierItem {
  value: string;
  label: string;
}

export interface INoticeClassifier {
  data: INoticeClassifierItem[];
  defaultLabel: number;
  searchPlaceholder?: string;
}

export interface INoticeAllItem {
  id: number;
  title: string;
  hitCount?: number;
  fixed?: boolean;
  /** TODO: inquires와 proposals prop key가 다름 */
  authorName?: string; // inquires
  name?: string; // proposals
  /** TODO: notices와 inquires, proposals prop key가 다름 */
  createdAt?: string; // notices
  createdDate?: string; // inquires, proposals
  updatedAt?: string;
}

export interface INoticeHeading {
  heading: string;
  classifier: INoticeClassifier;
}

export interface INoticeContent {
  items?: INoticeAllItem[];
}

export interface INoticeHandler {
  handleInput: (event: ChangeEvent<HTMLInputElement>, payload?: unknown) => void;
  handleSelect: (value: string | null, option?: ComboboxItem) => void;
}

/** Noticeboard Detail Types */
export interface IBoardAttachment {
  id: number;
  uuid: string;
  name: string;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface INoticeDetailItem {
  id: number;
  title: string;
  content: string;
  hitCount: number;
  fixed: boolean;
  createdAt: string;
  updatedAt: string;
  files?: IBoardAttachment[];
}

/** Noticeboard Detail Navigation */
interface INavItem {
  title: string;
  url: string;
}

export interface INoticeDetailNav {
  prev_page?: INavItem;
  next_page?: INavItem;
}

/** Board Pagination Types */
type justifyAlign = "start" | "center" | "end";

export interface IBoardPagin {
  paginShow: number;
  paginJustify: justifyAlign;
  paginMarginTop: string;
}
