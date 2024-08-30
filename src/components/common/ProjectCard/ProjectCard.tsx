import { Card, CardSection, Divider, Group, Stack } from "@mantine/core";
import Image from "next/image";
import classes from "./ProjectCard.module.css";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { ProjectCardLikeSection } from "./ProjectCardLikeSection";
import { CardBadge } from "../CardBadge";

export interface ProjectCardProps {
  id: number;
  projectName: string;
  thumbnailUrl: string;
  teamName: string;
  studentNames: string[];
  professorNames: string[];
  projectCategory: string;
  likeCount: number;
  like: boolean;
  bookMark: boolean;
  width?: string;
  height?: string;
}

export function ProjectCard({
  id,
  projectName,
  thumbnailUrl,
  teamName,
  studentNames,
  professorNames,
  projectCategory,
  likeCount,
  like,
  bookMark,
  width,
  height,
}: ProjectCardProps) {
  const studentsString = studentNames.join(", ");
  const professorString = professorNames.join(", ");

  return (
    <Card className={classes.card} w={width} h={height}>
      <CardSection className={classes["img-section"]}>
        <Link
          href={{
            pathname: `/${id}`,
          }}
          style={{ textDecorationLine: "none" }}
        >
          <Image
            src={thumbnailUrl}
            alt={"thumbnail"}
            className={classes.img}
            width={500}
            height={500}
            priority
          />
          <IconSearch className={classes.icon} />
        </Link>
      </CardSection>
      <CardSection pl={24} pt={8}>
        <Group className={classes["badge-group"]} gap={16}>
          <CardBadge label={projectCategory} />
        </Group>
      </CardSection>
      <CardSection pl={24} pr={24} pb={16} pt={8}>
        <Stack gap={8}>
          <div className={classes.title}>{projectName}</div>
          <div className={classes["participants-container"]}>{studentsString}</div>
          <Divider c={"var(--color-outline)"} />
        </Stack>
        <Stack gap={0} mt={8}>
          <Group gap={24}>
            <div className={classes["attr-wrapper"]}>참가팀명</div>
            <div className={classes["value-wrapper"]}>{teamName}</div>
          </Group>
          <Group gap={24}>
            <div className={classes["attr-wrapper"]}>지도교수</div>
            <div className={classes["value-wrapper"]}>{professorString}</div>
          </Group>
        </Stack>
      </CardSection>
      <ProjectCardLikeSection likes={likeCount} isMarked={bookMark} isLiked={like} />
    </Card>
  );
}
