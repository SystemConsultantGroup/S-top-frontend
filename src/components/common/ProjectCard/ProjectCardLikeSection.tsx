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
}

export function ProjectCardLikeSection({ likes, isLiked, isMarked }: ProjectCardLikeSectionProps) {
  return (
    <CardSection className={classes["like-section"]}>
      <Group className={classes["section-container"]} align="center" justify="space-between">
        <UnstyledButton>
          <Group gap={0}>
            {isLiked ? (
              <IconThumbUpFilled color="var(--color-primary)" />
            ) : (
              <IconThumbUp color="var(--color-primary)" />
            )}
            <div className={classes["likes-wrapper"]}>{likes}</div>
          </Group>
        </UnstyledButton>
        <UnstyledButton>
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
