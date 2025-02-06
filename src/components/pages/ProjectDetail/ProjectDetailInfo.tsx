"use client";

import { useAuth } from "@/components/common/Auth";
import { PrimaryButton } from "@/components/common/Buttons";
import { CardBadge } from "@/components/common/CardBadge";
import { CommonAxios } from "@/utils/CommonAxios";
import { getFileUrlById } from "@/utils/handleDownloadFile";
import { AspectRatio, Button, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ProjectDetailComment } from "./ProjectDetailComment";
import classes from "./ProjectDetailInfo.module.css";
import { ProjectDetailDto, categoryMapping } from "./_type/project";

interface Props {
  projectId: string;
}

export function ProjectDetailInfo({ projectId }: Props) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetailDto | null>(null);
  const [isThumbup, setIsThumbup] = useState<boolean>(false);
  const [isInterest, setIsInterest] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [poster, setPoster] = useState<string>("");

  // const handleRefresh = async () => {
  //   if (projectId) {
  //     console.log("refresh 함수 실행: ");
  //     const response = await CommonAxios.get(`/projects/${projectId}`);
  //     console.log("response: ", response);
  //     console.log("refresh 함수 실행: ", response.status);
  //     if (response.status === 200) {
  //       console.log("load data!");
  //       const data = response.data;
  //       setProject(data);

  //       setIsThumbup(data.like);
  //       setIsInterest(data.bookMark);
  //     }
  //   }
  // };

  const handleRefresh = useCallback(async () => {
    if (projectId) {
      console.log("refresh 함수 실행: ");
      const response = await CommonAxios.get(`/projects/${projectId}`);
      console.log("response: ", response);
      console.log("refresh 함수 실행: ", response.status);
      if (response.status === 200) {
        console.log("load data!");
        const data = response.data;
        //setProject(data);
        setProject((prevProject) => {
          if (JSON.stringify(prevProject) !== JSON.stringify(data)) {
            return data;
          }
          return prevProject;
        });

        setIsThumbup(data.like);
        setIsInterest(data.bookMark);
      }
    }
  }, [projectId]);

  useEffect(() => {
    console.log("projectId: ", projectId);

    // 프로젝트 상세 정보 불러오기
    const fetchProject = async () => {
      if (projectId) {
        const response = await CommonAxios.get(`/projects/${projectId}`);
        if (response.status === 200) {
          const data = response.data;
          // setProject(data);
          setProject((prevProject) => {
            if (JSON.stringify(prevProject) !== JSON.stringify(data)) {
              return data;
            }
            return prevProject;
          });

          setIsThumbup(data.like);
          setIsInterest(data.bookMark);

          // thumbnail, poster url 가져오기
          fetchImages(data.thumbnailInfo.id, data.posterInfo.id);
        }
      }
    };
    fetchProject();
  }, [projectId, handleRefresh]);

  const fetchImages = (thumbnailId: number, posterId: number) => {
    if (thumbnailId) {
      getFileUrlById(thumbnailId)
        .then((url) => {
          setThumbnail(url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (posterId) {
      getFileUrlById(posterId)
        .then((url) => {
          setPoster(url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const { isLoggedIn } = useAuth();

  const handleThumbupClick = async () => {
    if (!isLoggedIn) {
      alert("프로젝트에 좋아요를 표시하려면 로그인해야 합니다.");
      return;
    }
    if (isThumbup) {
      const response = await CommonAxios.delete(`/projects/${projectId}/like`);
      if (response.status === 204) {
        handleRefresh();
      }
    } else {
      const response = await CommonAxios.post(`/projects/${projectId}/like`);
      if (response.status === 201) {
        handleRefresh();
      }
    }
  };

  const handleInterestClick = async () => {
    if (!isLoggedIn) {
      alert("프로젝트를 북마크에 추가하려면 로그인해야 합니다.");
      return;
    }
    if (isInterest) {
      const response = await CommonAxios.delete(`/projects/${projectId}/favorite`);
      if (response.status === 204) {
        handleRefresh();
      }
    } else {
      const response = await CommonAxios.post(`/projects/${projectId}/favorite`);
      if (response.status === 201) {
        handleRefresh();
      }
    }
  };

  const handleProposalClick = () => {
    if (!isLoggedIn) {
      alert("산학 과제를 제안하려면 로그인해야 합니다.");
      return;
    }
    router.push("/infodesk/proposals");
  };

  const handleInquiryClick = () => {
    if (!isLoggedIn) {
      alert("프로젝트 문의를 하려면 로그인해야 합니다.");
      return;
    }
    router.push(`/infodesk/inquiries/write?id=${projectId}`);
  };

  return (
    <>
      <div className={classes.sectionTop}>
        <Text className={classes.title}>{project ? project.projectName : "-"}</Text>
        <Text className={classes.description}>{project ? project.description : "-"}</Text>
      </div>
      <Flex className={classes.sectionMiddle}>
        <div className={classes.imageWrapper}>
          {thumbnail && thumbnail.length > 0 && (
            <Image src={thumbnail} alt="project thumbnail" fill className={classes.image} />
          )}
        </div>
        <Stack gap={"lg"} className={classes.infoContainer}>
          <Stack gap={"sm"} className={classes.infoRowGroup}>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>제목</div>
              <div>{project ? project.projectName : "-"}</div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>연도</div>
              <div>{project ? project.year : "-"}</div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>참가팀명</div>
              <div>{project ? project.teamName : "-"}</div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>참여자</div>
              <div>{project && project.studentNames ? project.studentNames.join(", ") : "-"}</div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.firstCol}>지도교수</div>
              <div>
                {project && project.professorNames ? project.professorNames.join(", ") : "-"}
              </div>
            </div>
          </Stack>
          <Divider className={classes.divider} />
          <Flex gap={"sm"}>
            {project && <CardBadge label={categoryMapping(project.projectCategory)} />}
            {/* {project.tags.map((label: string, index: number) => (
              <CardBadge key={index} label={label} />
            ))} */}
          </Flex>
          <Group justify="center">
            <PrimaryButton className={classes.addBtn} onClick={handleThumbupClick}>
              {isThumbup ? <IconThumbUpFilled size={24} /> : <IconThumbUp size={24} />}
              <Text className={classes.btnLabel}>좋아요</Text>
            </PrimaryButton>
            <PrimaryButton className={classes.addBtn} onClick={handleInterestClick}>
              {isInterest ? <IconBookmarkFilled size={24} /> : <IconBookmark size={24} />}
              <Text className={classes.btnLabel}>관심프로젝트 등록</Text>
            </PrimaryButton>
          </Group>
        </Stack>
      </Flex>
      <Group justify="center">
        <Button className={classes.externalBtn} onClick={handleProposalClick}>
          산학 과제 제안하기
        </Button>
        <Button className={classes.externalBtn} onClick={handleInquiryClick}>
          프로젝트 문의하기
        </Button>
      </Group>
      <div className={classes.sectionBottom}>
        {project && project.youtubeId && (
          <>
            <Text className={classes.title}>작품 영상</Text>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${project?.youtubeId}`}
                title="YouTube video player"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          </>
        )}

        <Text className={classes.title}>포스터</Text>
        <div className={classes.posterWrapper}>
          {poster && poster.length > 0 && (
            <Image
              src={poster}
              alt="project poster"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>
      <ProjectDetailComment
        projectId={projectId}
        comments={project?.comments}
        onRefresh={handleRefresh}
      />
    </>
  );
}
