import { ComboboxItem } from "@mantine/core";
import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode } from "react";

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
  title: string;
  number: number;
  author: string;
  date: Date;
  view: number;
  pinned: boolean;
  href: string;
  contentTxt: string;
}

export interface INoticeHeading {
  heading: string;
  classifier: INoticeClassifier;
}

export interface INoticeContent {
  items: INoticeAllItem[];
}

export interface INoticeHandler {
  inputValue: string;
  handleInput: (event: MouseEvent | ChangeEvent, payload?: unknown) => void;
  handleKeyDown: (event: KeyboardEvent, payload?: unknown) => void;
  handleSelect: (value: string | null, option?: ComboboxItem) => void;
  handleSubmit: (event: MouseEvent, payload?: unknown) => void;
}

/** Noticeboard Detail Types */
export interface IBoardAttachment {
  name: string;
  url: string;
}

interface INavigationPage {
  title: string;
  url: string;
}

export type INoticeDetailItem = INoticeDetailHead & INoticeDetailStage & INoticeDetailNav;

export interface INoticeDetailHead {
  title: string;
  author: string;
  created_date: Date;
  edited_date: Date;
  pinned: boolean;
}

export interface INoticeDetailStage {
  attachment?: IBoardAttachment[];
  children?: ReactNode;
}

export interface INoticeDetailNav {
  prev_page?: INavigationPage;
  next_page?: INavigationPage;
}

/** Board Pagination Types */
type justifyAlign = "start" | "center" | "end";

export interface IBoardPagin {
  paginShow: number;
  paginJustify: justifyAlign;
  paginMarginTop: string;
}
