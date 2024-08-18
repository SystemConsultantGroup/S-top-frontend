"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Flex, Text, AspectRatio, Button, Group, Stack, Divider } from "@mantine/core";
import classes from "./ProjectDetailInfo.module.css";
import { project as mockup, ProjectDetailDto } from "./_mock/mock-project";
import { CardBadge } from "@/components/common/CardBadge";
import { PrimaryButton } from "@/components/common/Buttons";
import {
  IconThumbUp,
  IconThumbUpFilled,
  IconBookmark,
  IconBookmarkFilled,
} from "@tabler/icons-react";

interface Props {
  projectId: string;
}

export function ProjectDetailInfo({ projectId }: Props) {
  const [project, setProject] = useState<ProjectDetailDto>(mockup);
  const [isThumbup, setIsThumbup] = useState<boolean>(false);
  const [isInterest, setIsInterest] = useState<boolean>(false);

  useEffect(() => {
    /**
     * TODO: project 상세정보 불러오기
     */
    console.log("projectId: ", projectId);
    setProject(mockup);
    setIsThumbup(mockup.isThumbup);
    setIsInterest(mockup.isInterest);
  }, [projectId]);

  return (
    <>
      <div className={classes.sectionTop}>
        <Text className={classes.title}>{project.projectName}</Text>
        <Text className={classes.description}>{project.description}</Text>
      </div>
      <Flex className={classes.sectionMiddle}>
        <div className={classes.imageWrapper}>
          <Image
            src="/images/_mock/project-thumbnail.png"
            alt="project thumbnail"
            fill
            className={classes.image}
          />
        </div>
        <Stack gap={"lg"} className={classes.infoContainer}>
          <Stack gap={"sm"} className={classes.infoRowGroup}>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>제목</div>
              <div>{project.projectName}</div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>연도</div>
              <div>{project.year}</div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>참가팀명</div>
              <div>{project.teamName}</div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>참여자</div>
              <div>{project.participants.join(", ")}</div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>지도교수</div>
              <div>{project.professorName.join(", ")}</div>
            </div>
          </Stack>
          <Divider className={classes.divider} />
          <Flex gap={"sm"}>
            {project.tags.map((label: string, index: number) => (
              <CardBadge key={index} label={label} />
            ))}
          </Flex>
          <Group justify="center">
            <PrimaryButton className={classes.addBtn}>
              {isThumbup ? <IconThumbUpFilled size={24} /> : <IconThumbUp size={24} />}
              <Text className={classes.btnLabel}>좋아요</Text>
            </PrimaryButton>
            <PrimaryButton className={classes.addBtn}>
              {isInterest ? <IconBookmarkFilled size={24} /> : <IconBookmark size={24} />}
              <Text className={classes.btnLabel}>관심프로젝트 등록</Text>
            </PrimaryButton>
          </Group>
        </Stack>
      </Flex>
      <Group justify="center">
        <Button className={classes.externalBtn}>산학 과제 제안하기</Button>
        <Button className={classes.externalBtn}>프로젝트 문의하기</Button>
      </Group>
      <div className={classes.sectionBottom}>
        <Text className={classes.title}>작품 영상</Text>
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={project.videoUrl}
            title="YouTube video player"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
        <Text className={classes.title}>포스터</Text>
      </div>
    </>
  );
}
