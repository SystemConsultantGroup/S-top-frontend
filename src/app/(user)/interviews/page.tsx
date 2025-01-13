"use client";

import React, { useState } from "react";
//import { useRouter } from "next/navigation"; // Import the Next.js router

import { Banner } from "@/components/common/Banner/Banner";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";

import classes from "./interviews.module.css";

export default function InterviewsPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  // Example video card data
  const videoData = [
    {
      title: "뤼튼 테크놀로지스",
      subtitle: "현지웅 엔지니어님",
      videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
    },
    {
      title: "스타트업 대담 2",
      subtitle: "기술의 발전",
      videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
    },
    {
      title: "스타트업 대담 3",
      subtitle: "혁신과 미래",
      videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
    },
    // Add more video data as needed
  ];

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
          <SearchInput placeholder="대담영상 검색" />

          <div className={classes.filters}>
            <Dropdown
              options={["연도", "기업명", "전체"]}
              placeholder="검색 옵션"
              onOptionClick={handleOptionSelect}
            />
          </div>
        </div>
        {/* Video card grid section */}
        <div className={classes.videoGrid}>
          {videoData.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              subtitle={video.subtitle}
              videoUrl={video.videoUrl}
              bookmarked={false} // Default to not bookmarked
              onBookmarkToggle={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
