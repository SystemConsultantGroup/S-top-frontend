"use client";

import { useState, useEffect } from "react";

import { Banner } from "@/components/common/Banner/Banner";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
import { Group, Pagination } from "@mantine/core";
import { useAuth } from "@/components/common/Auth";
import { CardGridContainer } from "@/components/common/CardGridContainer/CardGridContainer";

import classes from "./interviews.module.css";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";

interface VideoData {
  id: number;
  title: string;
  subtitle: string;
  videoUrl: string;
  favorite: boolean;
}

interface VideoApiResponse {
  id: number;
  title: string;
  talkerName: string;
  talkerBelonging: string;
  youtubeId: string;
  favorite: boolean;
}

interface FetchVideoParams {
  page: number;
  size: number;
  year?: string;
  title?: string;
}

const YEARS = ["전체 연도", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

export default function InterviewsPage() {
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();

  const [pageNumber, setPageNumber] = useState(1); // 페이지 번호
  const [pageSize] = useState(10); // 페이지 크기
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // Handler for toggling bookmark state
  const handleBookmarkToggle = async (id: number) => {
    if (isLoggedIn) {
      const isVideoBookmarked = videoData.find((video) => video.id === id)?.favorite;

      try {
        if (isVideoBookmarked) {
          // 북마크 취소할 경우
          await CommonAxios.delete(`/talks/${id}/favorite`);
        } else {
          // 북마크 추가할 경우
          await CommonAxios.post(`/talks/${id}/favorite`);
        }
      } catch (error) {
        alert("북마크 상태를 업데이트하는 데 실패했습니다.");
      }

      fetchVideoData();
    } else {
      alert("대담영상을 북마크에 추가하려면 로그인이 필요합니다.");
    }
  };

  useEffect(() => {
    fetchVideoData();
    // TODO: isLoggedIn 을 추가한 이유는, 최초 요청 시 토큰 없이 요청이 되고
    // 이후에 로그인을 하면 토큰이 추가되어 요청이 가서, 북마크가 올바르게 동작하게 된다.
    // 토큰 검증이 모든 API 호출 전에 이루어질 수 있도록 근본적인 해결이 필요하다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, yearFilter, pageNumber, isLoggedIn]);

  const fetchVideoData = async () => {
    try {
      const params: FetchVideoParams = {
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

      const formattedData = response.data.content
        .filter((item: VideoApiResponse) => item.id) // Filter out things w/o id
        .map((item: VideoApiResponse) => ({
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
            <Dropdown
              options={YEARS}
              placeholder="전체 연도"
              selectedOption={yearFilter}
              onOptionClick={handleYearSelect}
            />
          </div>
        </div>
        <CardGridContainer>
          {videoData.map((video) =>
            video.id ? ( // Check if video.id exists
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                subtitle={video.subtitle}
                videoUrl={video.videoUrl}
                bookmarked={video.favorite}
                onBookmarkToggle={(id) => handleBookmarkToggle(id)}
                isLoggedIn={isLoggedIn}
              />
            ) : null
          )}
        </CardGridContainer>
        <Group justify="center" mt={20}>
          <Pagination value={pageNumber} onChange={setPageNumber} total={totalPages} />
        </Group>
      </div>
    </>
  );
}
