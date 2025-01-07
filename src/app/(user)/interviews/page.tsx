"use client";

import React, { useState, useEffect } from "react";
//import { useRouter } from "next/navigation"; // Import the Next.js router

import { Banner } from "@/components/common/Banner/Banner";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
import { Group, Pagination } from "@mantine/core";

import classes from "./interviews.module.css";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";

interface VideoData {
  id: number;
  title: string;
  subtitle: string;
  videoUrl: string;
  favorite: boolean;
}

const YEARS = ["전체 연도", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];
//const OPTIONS = [];

export default function InterviewsPage() {
  //const [selectedOption, setSelectedOption] = useState<string>("제목");
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string | null>(null);

  const [pageNumber, setPageNumber] = useState(1); // 페이지 번호
  const [pageSize] = useState(10); // 페이지 크기
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // const [bookmarked, setBookmarked] = useState(VideoData.favorite);

  // Handler for toggling bookmark state
  const handleBookmarkToggle = (id: number) => {
    setVideoData((prevData) =>
      prevData.map((video) => (video.id === id ? { ...video, favorite: !video.favorite } : video))
    );

    // Optionally, you can sync this change to the server
    CommonAxios.post(`/talks/${id}/favorite`, {
      favorite: videoData.find((video) => video.id === id)?.favorite,
    }).catch((error) => {
      console.error("Failed to update bookmark status on the server", error);
    });
  };

  /*
  const optionMapping: { [key: string]: string } = {
    제목: "title",
    기업명: "talkerBelonging",
    대담자: "talkerName",
  };*/

  useEffect(() => {
    fetchVideoData();
  }, [searchQuery, yearFilter, pageNumber]);

  const fetchVideoData = async () => {
    try {
      const params: any = {
        page: pageNumber - 1, // 페이지 번호는 0부터 시작
        size: pageSize,
      };

      // 연도 필터가 "전체"가 아니면 year 파라미터 추가
      if (yearFilter && yearFilter !== "전체") {
        params.year = yearFilter;
      }

      if (searchQuery) {
        params.title = searchQuery; // 검색은 제목만 기준으로 진행
      }

      const response = await CommonAxios.get("/talks", { params });

      const formattedData = response.data.content.map((item: any) => ({
        id: item.id,
        title: item.title,
        subtitle: `${item.talkerName} ${item.talkerBelonging}`,
        videoUrl: `https://www.youtube.com/embed/${item.youtubeId}`,
        favorite: item.favorite,
      }));

      setVideoData(formattedData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch video data", error);
    }
  };

  const handleYearSelect = (year: string) => {
    if (year == "전체 연도") setYearFilter(null);
    else setYearFilter(year);
    setPageNumber(1);
  };
  /*
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setSearchQuery("");
  };
!selectedOption
                ? "대담영상 검색"
                : selectedOption === "제목"
                  ? "제목으로 검색"
                  : selectedOption === "기업명"
                    ? "기업명으로 검색"
                    : "대담자로 검색" */
  return (
    <>
      <div className={classes.banner}>
        <Banner
          type="INTERVIEW"
          title="스타트업 대담 영상"
          subtitle="Start-up Interview"
          text="다양한 스타트업의 기술 전문가들이 한자리에 모여 아이디어와 성공 스토리를 나누는 특별한 대담 영상들을 공개합니다."
          width="100%"
        />
      </div>

      <div className={classes.mainContent}>
        <div className={classes.searchSection}>
          <SearchInput
            placeholder={"대담영상 검색"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className={classes.filters}>
            <div className={classes.dropdown}>
              <Dropdown
                options={YEARS}
                placeholder="전체 연도"
                selectedOption={yearFilter}
                onOptionClick={handleYearSelect}
              />
            </div>
            {/*<Dropdown
              options={["제목", "기업명", "대담자"]}
              placeholder="검색 옵션"
              selectedOption={selectedOption}
              onOptionClick={handleOptionSelect}
            />*/}
          </div>
        </div>
        <div className={classes.videoGrid}>
          {videoData.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              subtitle={video.subtitle}
              videoUrl={video.videoUrl}
              bookmarked={video.favorite}
              onBookmarkToggle={() => handleBookmarkToggle(video.id)}
            />
          ))}
        </div>
        <Group justify="center" mt={20}>
          <Pagination value={pageNumber} onChange={setPageNumber} total={totalPages} />
        </Group>
      </div>
    </>
  );
}
