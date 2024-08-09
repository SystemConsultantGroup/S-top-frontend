import { ActionIcon, Group, Stack } from "@mantine/core";
import { ReactNode } from "react";
import styles from "../Main.module.css";
import { IconSquarePlus } from "@tabler/icons-react";

type Alignment = "left" | "center" | "right";

interface IArticleTitle {
  text: string;
  align?: Alignment;
}

type IArticleDetail = {
  uri: string;
  align?: Alignment;
};

interface IMainArticle {
  title: IArticleTitle;
  detailUri?: IArticleDetail;
  itemHead: ReactNode[];
}

export function MainArticle({ title, detailUri, itemHead }: IMainArticle) {
  const titleAlign = title.align ?? "left";
  const uriAlign = detailUri?.align ?? "left";

  const headingJustify = getHeadingJustify(titleAlign, uriAlign);

  return (
    <>
      <Stack gap={10}>
        <Group className={styles.articleHead} justify={headingJustify.justify} gap={5}>
          <div style={{ display: headingJustify.display }}></div>
          <h2>{title.text}</h2>
          <ActionIcon variant="transparent" size="xl">
            <IconSquarePlus className={styles.articleDetail} size={48} stroke={1.5} />
          </ActionIcon>
        </Group>
        <Group>{itemHead}</Group>
      </Stack>
    </>
  );
}

type Justify = "flex-start" | "center" | "space-between" | "flex-end";
type Display = "none" | "block";

/**
 * Determines the justification and display properties for heading alignment.
 *
 * @param {Alignment} title - alignment of the title
 * @param {Alignment} uri - alignment of the detail button
 * @returns {{ justify: Justify, display: Display }} An object containing:
 *  - `justify`: justify-content style value for articleHead flexbox
 *  - `display`: display style value for dummy div element
 * @throws {Error} Throws an error if the alignment pair is not recognized.
 *
 * Expected alignment pair:
 *  - title: left,    uri: left
 *  - title: left,    uri: right
 *  - title: center,  uri: center
 *  - title: center,  uri: right
 *  - title: right,   uri: right
 *
 * uri alignment has to be located right than title does and not centered.
 */
function getHeadingJustify(
  title: Alignment,
  uri: Alignment
): { justify: Justify; display: Display } {
  if (title === "left") {
    if (uri === "left") {
      return { justify: "flex-start", display: "none" };
    } else if (uri === "right") {
      return { justify: "space-between", display: "none" };
    }
  } else if (title === "center") {
    if (uri === "center") {
      return { justify: "center", display: "block" };
    } else if (uri === "right") {
      return { justify: "space-between", display: "block" };
    }
  } else if (title === "right") {
    if (uri === "right") {
      return { justify: "flex-end", display: "none" };
    }
  }
  throw new Error("Unexpected alignment: please check the available alignment pairs.");
}
