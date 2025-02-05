"use client";

import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { ProjectCard } from "@/components/common/ProjectCard";
import { useEffect, useState } from "react";
import classes from "./EventAwardView.module.css";
import { Text } from "@mantine/core";
import { getYears } from "@/utils/getYears";
import { CommonAxios } from "@/utils/CommonAxios";
import { AWARD_TYPE_LOOKUP_TABLE } from "@/constants/LookupTables";
import { IProjectContent } from "@/types/project";
import { getFileUrlById } from "@/utils/handleDownloadFile";

export function EventAwardView() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [projects, setProjects] = useState<IProjectContent[]>([]);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);

  const years = getYears();

  /**
   * 가장 최근 연도를 디폴트로 설정
   */
  useEffect(() => {
    const setDefaultYear = async () => {
      try {
        // 가장 최근 연도의 데이터를 가져옵니다.
        const recentYear = years[0]; // 가장 최근 연도
        const response = await CommonAxios.get(`projects/award?year=${recentYear}`);
        const projectDatas: IProjectContent[] = response.data?.content;

        // 수상자가 존재하면 해당 연도를 설정, 그렇지 않으면 years[1] 설정
        if (projectDatas && projectDatas.length > 0) {
          setSelectedYear(recentYear);
        } else {
          setSelectedYear(years[1]); // 두 번째 연도를 기본값으로 설정
        }
      } catch (error) {
        console.error("Error checking recent year awards:", error);
        setSelectedYear(years[1]); // 오류 발생 시에도 기본값 설정
      }
    };

    if (!selectedYear && years && years.length > 0) {
      setDefaultYear();
    }
  }, [years, selectedYear]);

  /**
   * 연도 바뀔 때마다 수상작 가져오기
   */
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await CommonAxios.get(`projects/award?year=${selectedYear}`);
        const projectDatas: IProjectContent[] = response.data?.content;
        setProjects(projectDatas);
        // thumbnail url 가져오기
        const promises = projectDatas.map((data) => getFileUrlById(data.thumbnailInfo.id));
        const urlResults = await Promise.all(promises);
        setThumbnailUrls(urlResults);
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
      }
    };
    fetchAwards();
  }, [selectedYear]);

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
   * bookMark 핸들러
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
   * 프로젝트 like 상태 업데이트
   */
  const updateProjectLikeStatus = (idx: number, likeStatus: boolean) => {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) => (i === idx ? { ...project, like: likeStatus } : project))
    );
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

  return (
    <div className={classes.container}>
      <Dropdown
        options={years}
        placeholder={"연도"}
        onOptionClick={setSelectedYear}
        selectedOption={selectedYear}
      ></Dropdown>
      <Text className={classes.subtitle}>{selectedYear}년도 수상 내역</Text>
      <div className={classes.projectGrid}>
        {projects.map((data, idx) => {
          const thumbnailUrl = thumbnailUrls[idx];
          return (
            <div key={idx}>
              <Text className={classes.awardType}>{AWARD_TYPE_LOOKUP_TABLE[data.awardStatus]}</Text>
              <ProjectCard
                data={data}
                thumbnailUrl={thumbnailUrl}
                onClickLike={() => handleClickLike(idx)}
                onClickBookmark={() => handleClickBookMark(idx)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
