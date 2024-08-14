import { ComboboxItem } from "@mantine/core";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";

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

type justifyAlign = "start" | "center" | "end";

export interface IBoardPagin {
  paginShow: number;
  paginJustify: justifyAlign;
  paginMarginTop: string;
}
