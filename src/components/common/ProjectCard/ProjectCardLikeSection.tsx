import { CardSection, Group, UnstyledButton } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconThumbUp } from "@tabler/icons-react";
import classes from "./ProjectCard.module.css";

export interface ProjectCardLikeSectionProps {
  likes: number;
  isMarked: boolean;
}

export function ProjectCardLikeSection({ likes, isMarked }: ProjectCardLikeSectionProps) {
  return (
    <CardSection className={classes["like-section"]}>
      <Group align="center" justify="space-between" w={500} p={16}>
        <UnstyledButton>
          <Group gap={0}>
            <IconThumbUp color="var(--color-primary)" />
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
