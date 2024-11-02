"use client";
import React, { useState, useEffect } from "react";
import styles from "./jobfairRe.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { JobFairCard } from "@/components/common/JobFairCard/JobFairCard";

interface JobInfo {
  company: string;
  jobTypes: string[];
  region: string;
  position: string;
  logo: string;
  salary: string;
  website: string;
  state: string[];
  hiringTime: string;
  object: string;
  id: string;
  url: string;
}

const RecruitmentsPage = () => {
  const [selectedYearType, setYearType] = useState<string | null>(null);
  const [selectedFieldType, setFieldType] = useState<string | null>(null);
  const [selectedHireType, setHireType] = useState<string | null>(null);
  const [jobInfos, setJobInfos] = useState<JobInfo[]>([]);

  const handleYearType = (type: string) => {
    setYearType(type);
  };
  const handleFieldType = (type: string) => {
    setFieldType(type);
  };
  const handleHireType = (type: string) => {
    setHireType(type);
  };

  useEffect(() => {
    const fetchJobInfos = async () => {
      try {
        const response = await fetch("http://localhost:8000/jobInfos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: 0,
            size: 10,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const validContent = data.content.filter((item: any) => item.company !== null); // null인 항목 제거
          setJobInfos(validContent); // 검증된 데이터로 상태 업데이트
          console.log("Fetched data:", data); // 데이터를 콘솔에 출력
        } else {
          console.error("Failed to fetch jobInfos");
        }
      } catch (error) {
        console.error("Error fetching jobInfos:", error);
      }
    };

    fetchJobInfos();
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
          {jobInfos.map((jobInfo) => (
            <JobFairCard
              key={jobInfo.id}
              logo={jobInfo.url} // 로고 이미지 URL
              company={jobInfo.company} // 회사명
              position={jobInfo.position} // 포지션 제목
              employmentType={jobInfo.jobTypes} // 고용 형태 배열
              location={jobInfo.region} // 근무 지역
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentsPage;
