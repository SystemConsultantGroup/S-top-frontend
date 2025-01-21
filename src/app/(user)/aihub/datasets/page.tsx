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
const SIZE = ["필터1", "필터2", "필터3", "필터4", "필터5"];

export default function DatasetsPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedYearOptions, setSelectedYearOptions] = useState<string[]>([]);
  const [selectedTopicOptions, setSelectedTopicOptions] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
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

  const fetchData = async () => {
    try {
      const filters: Record<string, any> = {
        title: searchQuery || null,
        dataTypes: selectedOptions,
        topics: selectedTopicOptions,
        developmentYears: selectedYearOptions.map((year) => parseInt(year, 10)),
        professor: null, // 추후 필요 시 추가
        participants: null, // 추후 필요 시 추가
      };

      const response = await CommonAxios.post("/aihub/datasets", filters, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      const transformedDatasets = response.data.content.map((data: any) => ({
        id: data.id,
        title: data.title,
        participants: data.participants,
        professor: data.professor,
        dataTypes: data.dataTypes,
        years: data.developmentYears,
        categories: data.topics,
        url: data.url,
      }));
      setDatasets(transformedDatasets);
    } catch (error) {
      console.error("Error fetching datasets:", error);
    }
  };

  // Fetch all datasets on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Refetch datasets whenever filters or search query changes
  useEffect(() => {
    fetchData(); // Fetch with filters if any of them changes
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
            placeholder="데이터셋 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className={classes.filters}>
            <Dropdown options={YEARS} placeholder="연도" onOptionClick={handleYearOptionSelect} />
            <Dropdown
              options={TYPES}
              placeholder="파일 타입"
              onOptionClick={handleTopicOptionSelect}
            />
            <Dropdown options={SIZE} placeholder="파일 사이즈" onOptionClick={handleOptionSelect} />
          </div>

          <div className={classes.chips}>
            {[...selectedYearOptions, ...selectedTopicOptions, ...selectedOptions].map((option) => (
              <FilterChip key={option} label={option} onRemove={() => handleRemoveChip(option)} />
            ))}
          </div>
        </div>

        <div className={classes.gridContainer}>
          {datasets.map((dataset) => (
            <AihubCard
              key={dataset.id}
              title={dataset.title}
              people={dataset.professor}
              company={dataset.participants.join(", ")}
              model={dataset.dataTypes.join(", ")}
            />
          ))}
        </div>
      </div>
    </>
  );
}
