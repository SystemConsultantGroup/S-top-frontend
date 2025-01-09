"use client";

import { CardSection, Group, UnstyledButton } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import classes from "./ProjectCard.module.css";
import { useState } from "react";

export interface ProjectCardLikeSectionProps {
  likes: number;
  isLiked: boolean;
  isMarked: boolean;
  onClickLike: () => void;
  onClickBookmark: () => void;
}

export function ProjectCardLikeSection({
  likes,
  isLiked,
  isMarked,
  onClickLike,
  onClickBookmark,
}: ProjectCardLikeSectionProps) {
  const [like, setLike] = useState<number>(likes);
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const [isMark, setIsMark] = useState<boolean>(isMarked);

  const handleLike = () => {
    setIsLike((prev) => !prev);
    if (isLike) setLike((prev) => prev - 1);
    else setLike((prev) => prev + 1);
    onClickLike();
  };
  const handleBookmark = () => {
    setIsMark((prev) => !prev);
    onClickBookmark();
  };
  return (
    <CardSection className={classes["like-section"]}>
      <Group align="center" justify="space-between" p="8px 16px">
        <UnstyledButton onClick={handleLike}>
          <Group gap={0}>
            {isLike ? (
              <IconThumbUpFilled color="var(--color-primary)" />
            ) : (
              <IconThumbUp color="var(--color-primary)" />
            )}
            <div className={classes["likes-wrapper"]}>{like}</div>
          </Group>
        </UnstyledButton>
        <UnstyledButton onClick={handleBookmark}>
          {isMark ? (
            <IconBookmarkFilled color="var(--color-primary)" />
          ) : (
            <IconBookmark color="var(--color-primary)" />
          )}
        </UnstyledButton>
      </Group>
    </CardSection>
  );
}
