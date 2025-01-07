"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./MypageView.module.css";
import { ProjectCard } from "@/components/common/ProjectCard";
import { Text } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
import { IconReportSearch } from "@tabler/icons-react";

import { PrimaryButton } from "@/components/common/Buttons";
import { IProjectContent } from "@/types/project";
import { CommonAxios } from "@/utils/CommonAxios";
import { ITalkContent } from "@/types/talks";
import { JobInterview } from "@/types/JobInterview";
import { getFileUrlById } from "@/utils/handleDownloadFile";

export function MypageInterest() {
  const [projects, setProjects] = useState<IProjectContent[]>([]);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);
  const [talks, setTalks] = useState<ITalkContent[]>([]);
  const [jobfairInterviews, setJobfairInterviews] = useState<JobInterview[]>([]);
  const router = useRouter();

  const fetchFavoriteProjects = async () => {
    try {
      const response = await CommonAxios.get("/users/favorites/projects");
      setProjects(response.data);
      // thumbnail url 가져오기
      const promises = response.data.map((data: IProjectContent) =>
        getFileUrlById(data.thumbnailInfo.id)
      );
      const urlResults = await Promise.all(promises);
      setThumbnailUrls(urlResults);
    } catch (error) {
      console.error("Failed to fetch favorite projects: ", error);
    } finally {
    }
  };

  const fetchFavoriteTalks = async () => {
    try {
      const response = await CommonAxios.get("/users/favorites/talks");
      setTalks(response.data);
    } catch (error) {
      console.error("Failed to fetch favorite talks: ", error);
    } finally {
    }
  };

  const fetchFavoriteJobfairInterviews = async () => {
    try {
      const response = await CommonAxios.get("/users/favorites/jobInterviews");
      setJobfairInterviews(response.data);
    } catch (error) {
      console.error("Failed to fetch favorite jobfair interviews: ", error);
    } finally {
    }
  };

  /**
   * 관심 등록 프로젝트, 영상 가져오기
   */
  useEffect(() => {
    fetchFavoriteProjects();
    fetchFavoriteTalks();
    fetchFavoriteJobfairInterviews();
  }, []);

  /**
   * 프로젝트, 대담영상, 잡페어 인터뷰 영상 페이지로 이동
   */
  const handleProjectButtonClick = () => {
    router.push("/projects");
  };

  const handleVideoButtonClick = () => {
    router.push("/interviews");
  };

  const handleJobfairButtonClick = () => {
    router.push("/jobfair/advices");
  };

  /**
   * like 핸들러
   */
  const handleClickLike = async (idx: number) => {
    const data = projects[idx];
    try {
      if (data.like) {
        await CommonAxios.delete(`/projects/${data.id}/like`);
        updateProjectLikeStatus(idx, false);
      } else {
        await CommonAxios.post(`/projects/${data.id}/like`);
        updateProjectLikeStatus(idx, true);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  /**
   * 프로젝트 like 상태 업데이트
   */
  const updateProjectLikeStatus = (idx: number, likeStatus: boolean) => {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) => (i === idx ? { ...project, like: likeStatus } : project))
    );
  };

  /**
   * 프로젝트 bookMark 핸들러
   */
  const handleClickBookMark = async (idx: number) => {
    const data = projects[idx];
    try {
      if (data.bookMark) {
        await CommonAxios.delete(`/projects/${data.id}/favorite`);
        updateProjectBookMarkStatus(idx, false);
      } else {
        await CommonAxios.post(`/projects/${data.id}/favorite`);
        updateProjectBookMarkStatus(idx, true);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  /**
   * 프로젝트 bookMark 상태 업데이트
   */
  const updateProjectBookMarkStatus = (idx: number, bookMarkStatus: boolean) => {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === idx ? { ...project, bookMark: bookMarkStatus } : project
      )
    );
  };

  /**
   * 관심 대담영상 bookMark 핸들러
   */
  const handleClickTalksBookMark = async (idx: number) => {
    const data = talks[idx];
    try {
      if (data.favorite) {
        await CommonAxios.delete(`/talks/${data.id}/favorite`);
      } else {
        await CommonAxios.post(`/talks/${data.id}/favorite`);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  /**
   * 관심 잡페어 인터뷰 bookMark 핸들러
   */
  const handleClickJobsBookMark = async (idx: number) => {
    const data = jobfairInterviews[idx];
    try {
      if (data.favorite) {
        await CommonAxios.delete(`/jobInterviews/${data.id}/favorite`);
      } else {
        await CommonAxios.post(`/jobInterviews/${data.id}/favorite`);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <>
      <div className={classes.interestContainer}>
        <Text className={classes.title}>관심 등록 프로젝트</Text>
        {projects && projects.length > 0 ? (
          <Carousel dragFree slideGap="md" slideSize="20%" align="start" containScroll="trimSnaps">
            {projects.map((data, idx) => {
              const thumbnailUrl = thumbnailUrls[idx];
              return (
                <CarouselSlide key={idx}>
                  <ProjectCard
                    data={data}
                    thumbnailUrl={thumbnailUrl}
                    onClickLike={() => handleClickLike(idx)}
                    onClickBookmark={() => handleClickBookMark(idx)}
                  />
                </CarouselSlide>
              );
            })}
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
        {talks && talks.length > 0 ? (
          <Carousel dragFree slideGap="md" slideSize="20%" align="start" containScroll="trimSnaps">
            {talks.map((data, idx) => (
              <CarouselSlide key={idx}>
                <VideoCard
                  title={data.title}
                  videoUrl={`https://www.youtube.com/embed/${data.youtubeId}`}
                  bookmarked={data.favorite}
                  onBookmarkToggle={() => handleClickTalksBookMark}
                />
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
        {jobfairInterviews && jobfairInterviews.length > 0 ? (
          <Carousel dragFree slideGap="md" slideSize="20%" align="start" containScroll="trimSnaps">
            {jobfairInterviews.map((data, idx) => (
              <CarouselSlide key={idx}>
                <VideoCard
                  title={data.title}
                  videoUrl={`https://www.youtube.com/embed/${data.youtubeId}`}
                  bookmarked={data.favorite}
                  onBookmarkToggle={() => handleClickJobsBookMark}
                />
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
