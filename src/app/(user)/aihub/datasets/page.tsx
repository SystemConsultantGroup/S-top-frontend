"use client";

import React, { useState } from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { AihubCard } from "@/components/common/Cards/Aihub/Aihub";

import classes from "./AIHub.module.css";

export default function DatasetsPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  const handleRemoveChip = (option: string) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
  };

  return (
    <>
      <div className={classes.subHeadNavbar}>
        <SubHeadNavbar title="AI Hub" />
      </div>

      <div className={classes.banner}>
        <Banner
          type="AI_HUB"
          title="AI HUB"
          subtitle="AI HUB (Datasets and AI Models)"
          text="AI HUB는 우리학교 학생들이 수집한 데이터셋 및 개발한 모델을 전시하고, 공유하는 공간입니다."
          width="100%"
        />
      </div>

      <div className={classes.mainContent}>
        <div className={classes.searchSection}>
          <SearchInput placeholder="데이터셋 검색" />

          <div className={classes.filters}>
            <Dropdown
              options={["Option 1", "Option 2", "Option 3"]}
              placeholder="연도"
              onOptionClick={handleOptionSelect}
            />
            <Dropdown
              options={["Option 4", "Option 5", "Option 6"]}
              placeholder="파일 타입"
              onOptionClick={handleOptionSelect}
            />
            <Dropdown
              options={["Option 7", "Option 8", "Option 9"]}
              placeholder="파일 사이즈"
              onOptionClick={handleOptionSelect}
            />
          </div>

          <div className={classes.chips}>
            {selectedOptions.map((option) => (
              <FilterChip key={option} label={option} onRemove={() => handleRemoveChip(option)} />
            ))}
          </div>
        </div>

        <div className={classes.gridContainer}>
          <AihubCard
            title="AI 모델 데이터셋 1"
            people="개발자 A"
            company="회사 A"
            model="이미지 분류 모델"
          />
          <AihubCard
            title="AI 모델 데이터셋 2"
            people="개발자 B"
            company="회사 B"
            model="텍스트 분석 모델"
          />
          <AihubCard
            title="AI 모델 데이터셋 2"
            people="개발자 B"
            company="회사 B"
            model="텍스트 분석 모델"
          />
          <AihubCard
            title="AI 모델 데이터셋 2"
            people="개발자 B"
            company="회사 B"
            model="텍스트 분석 모델"
          />
          {/* Add more AihubCard components as needed */}
        </div>
      </div>
    </>
  );
}
