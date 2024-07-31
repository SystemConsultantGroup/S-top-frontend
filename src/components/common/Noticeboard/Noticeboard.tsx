"use client";

import { useState } from "react";
import styles from "./Noticeboard.module.css";
import { NoticeHeading } from "./elements/NoticeHeading";
import { NoticeContainer } from "./elements/NoticeContainer";

interface IBoardClassifier {
  labels: string[];
  defaultLabel: number;
  searchPlaceholder?: string;
}

export interface IBoardItem {
  title: string;
  number: number;
  author: string;
  date: Date;
  view: number;
  pinned: boolean;
  href: string;
}

export interface IBoardHeadingProps {
  heading: string;
  classifier: IBoardClassifier;
}

export interface IBoardContentProps {
  items: IBoardItem[];
}

export function Noticeboard({
  heading,
  classifier,
  items,
}: IBoardHeadingProps & IBoardContentProps) {
  const [value, setValue] = useState("");
  return (
    <>
      <div className={styles.noticeboard}>
        <NoticeHeading
          value={value}
          setValue={setValue}
          heading={heading}
          classifier={classifier}
        />
        <NoticeContainer items={items} />
      </div>
    </>
  );
}
