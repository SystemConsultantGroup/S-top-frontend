"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./MypageView.module.css";
import { ProjectCard, ProjectCardDataType } from "@/components/common/ProjectCard/ProjectCard";
import { Text } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
import { IconReportSearch } from "@tabler/icons-react";

import { IVideoCard, MockInterestProjects, MockInterestVideos } from "./_mock/mock-user";
import { PrimaryButton } from "@/components/common/Buttons";

export function MypageInterest() {
  const [projects, setProjects] = useState<ProjectCardDataType[] | null>(null);
  const [videos, setVideos] = useState<IVideoCard[] | null>(null);
  const [jobfairVideos, setJobfairVideos] = useState<IVideoCard[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    /* 관심 등록 프로젝트, 비디오 가져오기 */
    setProjects(MockInterestProjects);
    setVideos(MockInterestVideos);
    setJobfairVideos(null);
  }, []);

  const handleProjectButtonClick = () => {
    router.push("/projects");
  };

  const handleVideoButtonClick = () => {
    router.push("/interviews");
  };

  const handleJobfairButtonClick = () => {
    router.push("/jobfair/advices");
  };

  return (
    <>
      <div className={classes.interestContainer}>
        <Text className={classes.title}>관심 등록 프로젝트</Text>
        {projects ? (
          <Carousel dragFree slideGap="md" slideSize="20%" align="start" containScroll="trimSnaps">
            {projects.map((data, idx) => (
              <CarouselSlide key={idx}>
                <ProjectCard data={data} />
              </CarouselSlide>
            ))}
          </Carousel>
        ) : (
          <div className={classes.noContentDiv}>
            <IconReportSearch stroke={0.5} size={60} />
            <div className={classes.noContentText}>
              <Text className={classes.first}>현재 관심 등록한 프로젝트가 없습니다.</Text>
              <Text className={classes.second}>
                프로젝트 탭에서 마음에 드는 프로젝트를 찾아 관심을 등록해보세요.
              </Text>
            </div>
            <PrimaryButton onClick={handleProjectButtonClick}>프로젝트 조회하기</PrimaryButton>
          </div>
        )}
      </div>
      <div className={classes.interestContainer}>
        <Text className={classes.title}>관심 등록 대담 영상</Text>
        {videos ? (
          <Carousel dragFree slideGap="md" slideSize="20%" align="start" containScroll="trimSnaps">
            {videos.map((data, idx) => (
              <CarouselSlide key={idx}>
                <VideoCard {...data} />
              </CarouselSlide>
            ))}
          </Carousel>
        ) : (
          <div className={classes.noContentDiv}>
            <IconReportSearch stroke={0.5} size={60} />
            <div className={classes.noContentText}>
              <Text className={classes.first}>현재 관심 등록한 대담 영상이 없습니다.</Text>
            </div>
            <PrimaryButton onClick={handleVideoButtonClick}>대담영상 보러가기</PrimaryButton>
          </div>
        )}
      </div>
      <div className={classes.interestContainer}>
        <Text className={classes.title}>관심 등록 잡페어 영상</Text>
        {jobfairVideos ? (
          <Carousel dragFree slideGap="md" slideSize="20%" align="start" containScroll="trimSnaps">
            {jobfairVideos.map((data, idx) => (
              <CarouselSlide key={idx}>
                <VideoCard {...data} />
              </CarouselSlide>
            ))}
          </Carousel>
        ) : (
          <div className={classes.noContentDiv}>
            <IconReportSearch stroke={0.5} size={60} />
            <div className={classes.noContentText}>
              <Text className={classes.first}>현재 관심 등록한 잡페어 영상이 없습니다.</Text>
            </div>
            <PrimaryButton onClick={handleJobfairButtonClick}>잡페어 바로가기</PrimaryButton>
          </div>
        )}
      </div>
    </>
  );
}
