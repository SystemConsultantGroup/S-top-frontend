"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Entrepreneurship.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard_noQuiz/VideoCard";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";
import { useAuth } from "@/components/common/Auth";
import { handleJobInterviewBookmarkToggle } from "@/utils/jobInterview/handleJobInterviewBookmarkToggle";
import { CardGridContainer } from "@/components/common/CardGridContainer/CardGridContainer";

interface Interview {
  id: number;
  title: string;
  youtubeId: string;
  year: number;
  talkerBelonging: string;
  talkerName: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
}

const YEARS = ["전체", "2025", "2024", "2023", "2022", "2021"];

export default function EntrepreneurshipPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();

  const handleBookmarkToggle = (id: number) => {
    handleJobInterviewBookmarkToggle({
      jobInterviewId: id,
      isLoggedIn,
      isAlreadyBookmarked: interviews.find((interview) => interview.id === id)?.favorite ?? false,
      onToggleSuccess: fetchInterviews,
      onToggleFail: () => {
        alert("북마크 상태를 변경하는 데 실패했습니다.");
      },
      onLoginCheckFail: () => {
        alert("인터뷰 영상을 북마크에 추가하려면 로그인이 필요합니다.");
      },
    });
  };

  const fetchInterviews = useCallback(async () => {
    try {
      const response = await CommonAxios.get("/jobInterviews", {
        params: {
          category: "ENTREPRENEURSHIP",
          year: selectedYear !== "전체" ? selectedYear : undefined,
          search: searchQuery || undefined,
          page: 0,
          size: 100,
        },
      });

      // API에서 category 필터링이 되는지 확실하지 않으므로 클라이언트에서도 한 번 더 필터링 (안전장치)
      // 만약 API가 category 파라미터를 지원한다면 response.data.content에 이미 필터링된 데이터가 올 것임
      const filteredInterviews = response.data.content.filter(
        (item: Interview) => item.category === "ENTREPRENEURSHIP"
      );
      setInterviews(filteredInterviews);
    } catch (error) {
      console.error("Error fetching entrepreneurship interviews:", error);
    }
  }, [selectedYear, searchQuery, isLoggedIn]);

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
  };

  // 클라이언트 사이드 검색어 필터링 (API에서 search 파라미터가 동작하더라도 추가적인 클라이언트 필터링이 필요할 수 있음)
  // 여기서는 API 결과를 그대로 렌더링하도록 함. (InternsPage 로직 참조)
  // InternsPage에서는 클라이언트 필터링도 하고 있음. 동일하게 구현.
  const filteredInterviews = interviews.filter((interview) => {
    const searchLower = searchQuery.trim().normalize("NFC").toLowerCase();
    const interviewTitle = interview.title.normalize("NFC").toLowerCase();
    const isMatchingSearch = !searchQuery || interviewTitle.includes(searchLower);

    const isMatchingYear =
      !selectedYear || selectedYear === "전체" || String(interview.year) === selectedYear;

    return isMatchingSearch && isMatchingYear;
  });

  return (
    <>
      <div className={styles.banner}>
        <Banner
          type="INTERVIEW"
          title="창업 이야기"
          subtitle="Entrepreneurship"
          text="성균관대학교 선배들이 들려주는 생생한 창업 도전기와 성공 스토리를 만나보세요."
        />
      </div>

      <div className={styles.mainContent}>
        <h2 className={styles.title}>선배님들의 창업 이야기</h2>

        <div className={styles.searchSection}>
          <SearchInput
            placeholder="창업 인터뷰 영상 검색"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={styles.filters}>
            <Dropdown
              options={YEARS}
              placeholder="전체"
              selectedOption={selectedYear}
              onOptionClick={handleYearSelect}
            />
          </div>
        </div>

        <CardGridContainer>
          {filteredInterviews.map((interview) => (
            <div key={interview.id}>
              <VideoCard
                id={interview.id}
                title={interview.title}
                subtitle={interview.talkerName}
                videoUrl={`https://www.youtube.com/embed/${interview.youtubeId}`}
                bookmarked={interview.favorite}
                onBookmarkToggle={() => handleBookmarkToggle(interview.id)}
              />
            </div>
          ))}
        </CardGridContainer>
      </div>
    </>
  );
}
