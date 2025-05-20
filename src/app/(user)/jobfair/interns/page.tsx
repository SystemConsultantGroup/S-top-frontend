"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./jonfairInterns.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard_noQuiz/VideoCard";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";
import { useAuth } from "@/components/common/Auth";
import { handleJobInterviewBookmarkToggle } from "@/utils/jobInterview/handleJobInterviewBookmarkToggle";

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

const InternsPage = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();

  const handleBookmarkToggle = (id: number) => {
    handleJobInterviewBookmarkToggle({
      jobInterviewId: id,
      isLoggedIn,
      //TODO: 특정 ID 의 job interview 를 못 찾은 경우 에러 처리 필요
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
          year: selectedYear !== "전체" ? selectedYear : undefined, // "All"이면 연도 필터를 적용하지 않음
          search: searchQuery || undefined, // 검색어 필터
          page: 0,
          size: 100,
        },
      });

      const filteredInterviewss = response.data.content.filter(
        (item: Interview) => item.category === "INTERN" // category 필터
      );
      setInterviews(filteredInterviewss);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  }, [selectedYear, searchQuery, isLoggedIn]);

  useEffect(() => {
    fetchInterviews();
    // TODO: isLoggedIn 을 추가한 이유는, 최초 요청 시 토큰 없이 요청이 되고
    // 이후에 로그인을 하면 토큰이 추가되어 요청이 가서, 북마크가 올바르게 동작하게 된다.
    // 토큰 검증이 모든 API 호출 전에 이루어질 수 있도록 근본적인 해결이 필요하다
  }, [fetchInterviews]);

  const filteredInterviews = interviews.filter((interview) => {
    const searchLower = searchQuery.trim().normalize("NFC").toLowerCase(); // 검색어 소문자로 변환 및 공백 제거
    const interviewTitle = interview.title.normalize("NFC").toLowerCase();
    const isMatchingSearch =
      !searchQuery || // 검색어가 없으면 무조건 true
      interviewTitle.includes(searchLower);

    const isMatchingYear =
      !selectedYear || // 선택된 연도가 없으면 무조건 true
      selectedYear === "전체" || // "All" 선택 시 모든 연도 허용
      String(interview.year) === selectedYear;

    return isMatchingSearch && isMatchingYear; // 검색어와 연도 둘 다 만족하는 경우
  });

  const handleYearSelect = (year: string) => {
    setSelectedYear(year); // 선택된 연도 업데이트
  };

  return (
    <div>
      <div className={styles.container}>
        <SubHeadNavbar title="Job Fair" />
        <Banner
          type="PROJECT"
          title="잡페어"
          subtitle="Job Fair"
          text="S-TOP Job Fair는 현업에 종사하고 있는 선배 개발자님들과 실무 경험을 얻고자 하는 학생들을 연결하여, IT 인재 양성 문화를 함께 만들기 위해 기획되었습니다."
        />
      </div>
      <div className={styles.backColor}>
        <div className={styles.search}>
          <h2 className={styles.title}>인턴들의 이야기</h2>
          <div className={styles.searchArea}>
            <SearchInput placeholder="영상 검색" onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className={styles.dropdown}>
            <Dropdown
              options={YEARS}
              placeholder="전체"
              selectedOption={selectedYear}
              onOptionClick={handleYearSelect}
            />
          </div>
        </div>
        <div className={styles.videoGrid}>
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
        </div>
      </div>
    </div>
  );
};

export default InternsPage;
