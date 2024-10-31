"use client";
import React, { useState } from "react";
import styles from "./jobfairRe.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
//import { JobFairCard } from "@/components/common/JobFairCard/JobFairCard";

const RecruitmentsPage = () => {
  const [selectedYearType, setYearType] = useState<string | null>(null);
  const [selectedFieldType, setFieldType] = useState<string | null>(null);
  const [selectedHireType, setHireType] = useState<string | null>(null);

  const handleYearType = (type: string) => {
    setYearType(type);
  };
  const handleFieldType = (type: string) => {
    setFieldType(type);
  };
  const handleHireType = (type: string) => {
    setHireType(type);
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
          <h2 className={styles.title}>채용 포지션</h2>
          <div className={styles.searchArea}>
            <SearchInput placeholder="채용 포지션 검색" />
          </div>
          <div className={styles.dropdown}>
            <Dropdown
              options={["2024", "2023", "2022"]}
              placeholder="연도"
              selectedOption={selectedYearType}
              onOptionClick={handleYearType}
            />
            <div className={styles.space}></div>
            <Dropdown
              options={["AI 개발자", "Web SDK 개발자", ""]}
              placeholder="분야"
              selectedOption={selectedFieldType}
              onOptionClick={handleFieldType}
            />
            <div className={styles.space}></div>
            <Dropdown
              options={["인턴", "신입 정규직", "치킨"]}
              placeholder="고용 형태"
              selectedOption={selectedHireType}
              onOptionClick={handleHireType}
            />
          </div>
        </div>
        <div className={styles.videoGrid}>
          {/* <JobFairCard
            logo = "/images/lululabLogo.png"
            company = "룰루랩"
            position = "Web SDK 개발자, AI 개발자"
            employmentType = {["인턴", "신입 정규직"]}
            location = "서울 강남구"
          /> */}
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
            bookmarked={false}
            onBookmarkToggle={() => {}}
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
            bookmarked={false}
            onBookmarkToggle={() => {}}
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
            bookmarked={false}
            onBookmarkToggle={() => {}}
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
            bookmarked={false}
            onBookmarkToggle={() => {}}
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
            bookmarked={false}
            onBookmarkToggle={() => {}}
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
            bookmarked={false}
            onBookmarkToggle={() => {}}
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
            bookmarked={false}
            onBookmarkToggle={() => {}}
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
            bookmarked={false}
            onBookmarkToggle={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruitmentsPage;
