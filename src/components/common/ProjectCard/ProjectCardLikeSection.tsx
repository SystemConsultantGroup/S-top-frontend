"use client";

import { CardSection, Group, UnstyledButton } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import classes from "./ProjectCard.module.css";

export interface ProjectCardLikeSectionProps {
  likes: number;
  isLiked: boolean;
  isMarked: boolean;
  onClickLike?: () => void;
  onClickBookmark?: () => void;
}

export function ProjectCardLikeSection({
  likes,
  isLiked,
  isMarked,
  onClickLike,
  onClickBookmark,
}: ProjectCardLikeSectionProps) {
  return (
    <CardSection className={classes["like-section"]}>
      <Group align="center" justify="space-between" w={500} p={16}>
        <UnstyledButton onClick={onClickLike}>
          <Group gap={0}>
            {isLiked ? (
              <IconThumbUpFilled color="var(--color-primary)" />
            ) : (
              <IconThumbUp color="var(--color-primary)" />
            )}
            <div className={classes["likes-wrapper"]}>{likes}</div>
          </Group>
        </UnstyledButton>
        <UnstyledButton onClick={onClickBookmark}>
          {isMarked ? (
            <IconBookmarkFilled color="var(--color-primary)" />
          ) : (
            <IconBookmark color="var(--color-primary)" />
          )}
        </UnstyledButton>
      </Group>
    </CardSection>
  );
}
