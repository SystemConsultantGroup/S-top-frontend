"use client";
import React, { useState, useEffect } from "react";
import { Banner } from "@/components/common/Banner/Banner";
import styles from "./jobfair.module.css"; // CSS 파일 import
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";

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
}

const JobFairPage = () => {
  const [selectedType, setSelected] = useState<string | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  const handleChange = (type: string) => {
    setSelected(type);
  };

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch("http://localhost:8000/jobInterviews", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "admin_access_token",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data); // 데이터를 콘솔에 출력
          setInterviews(data.content);
        } else {
          console.error("Failed to fetch interviews");
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };
    fetchInterviews();
  }, []);

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
          <h2 className={styles.title}>선배님들의 조언</h2>
          <div className={styles.searchArea}>
            <SearchInput placeholder="영상 검색" />
          </div>
          <div className={styles.dropdown}>
            <Dropdown
              options={["연도", "작성자", "제목"]}
              placeholder="연도"
              selectedOption={selectedType}
              onOptionClick={handleChange}
            />
          </div>
        </div>
        <div className={styles.videoGrid}>
          {interviews.map((interview) => (
            <VideoCard
              key={interview.id}
              title={interview.talkerBelonging}
              subtitle={interview.talkerName}
              videoUrl={"https://www.youtube.com/embed/${interview.youtubeId}"}
              bookmarked={false}
              onBookmarkToggle={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobFairPage;
