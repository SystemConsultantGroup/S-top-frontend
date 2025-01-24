"use client";

import React, { useState, useEffect } from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { AihubCard } from "@/components/common/Cards/Aihub/Aihub";
import classes from "./AIHub.module.css";
import { CommonAxios } from "@/utils/CommonAxios";

const YEARS = ["2020", "2021", "2022", "2023", "2024"];
const TYPES = ["tag1", "tag2", "tag3", "tag4", "tag5"];
const FRAMEWORK = ["필터1", "필터2", "필터3", "필터4", "필터5"];

export default function ModelsPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedYearOptions, setSelectedYearOptions] = useState<string[]>([]);
  const [selectedTopicOptions, setSelectedTopicOptions] = useState<string[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOptionSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  const handleYearOptionSelect = (option: string) => {
    if (!selectedYearOptions.includes(option)) {
      setSelectedYearOptions((prev) => [...prev, option]);
    }
  };

  const handleTopicOptionSelect = (option: string) => {
    if (!selectedTopicOptions.includes(option)) {
      setSelectedTopicOptions((prev) => [...prev, option]);
    }
  };

  const handleRemoveChip = (option: string) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
    setSelectedYearOptions((prev) => prev.filter((item) => item !== option));
    setSelectedTopicOptions((prev) => prev.filter((item) => item !== option));
  };

  const fetchModels = async () => {
    try {
      const filters: Record<string, any> = {
        title: searchQuery || "",
        learningModels: selectedOptions,
        topics: selectedTopicOptions,
        developmentYears: selectedYearOptions.map(Number),
        professor: "", // 추가적인 필드가 있다면 이곳에서 처리
        participants: [], // 초기화, 필요시 추가
      };

      const response = await CommonAxios.post("/aihub/models", filters, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      const transformedModels = response.data.content.map((model: any) => ({
        id: model.id,
        title: model.title,
        professor: model.professor,
        participants: model.participants,
        learningModels: model.learningModels,
        topics: model.topics,
        developmentYears: model.developmentYears,
        url: model.url,
      }));
      setModels(transformedModels);
    } catch (error) {
      console.error("Error fetching AI Hub models:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchModels();
  }, []);

  // 필터 변경 시 데이터 로드
  useEffect(() => {
    fetchModels();
  }, [searchQuery, selectedYearOptions, selectedTopicOptions, selectedOptions]);

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
          <SearchInput
            placeholder="AI모델 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className={classes.filters}>
            <Dropdown options={YEARS} placeholder="연도" onOptionClick={handleYearOptionSelect} />
            <Dropdown
              options={TYPES}
              placeholder="데이터 타입"
              onOptionClick={handleTopicOptionSelect}
            />
            <Dropdown
              options={FRAMEWORK}
              placeholder="프레임워크"
              onOptionClick={handleOptionSelect}
            />
          </div>

          <div className={classes.chips}>
            {[...selectedYearOptions, ...selectedTopicOptions, ...selectedOptions].map((option) => (
              <FilterChip key={option} label={option} onRemove={() => handleRemoveChip(option)} />
            ))}
          </div>
        </div>

        <div className={classes.gridContainer}>
          {models.map((model) => (
            <AihubCard
              key={model.id}
              title={model.title}
              people={model.professor}
              company={model.participants.join(", ")}
              model={model.learningModels.join(", ")}
            />
          ))}
        </div>
      </div>
    </>
  );
}
