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
// 필터링 옵션 리스트 만들기 ...

interface RichText {
  type: string;
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

interface Title {
  type: string;
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

interface Properties {
  Professor: {
    id: string;
    type: "rich_text";
    rich_text: RichText[];
  };
  dataType: {
    id: string;
    type: "multi_select";
    multi_select: MultiSelect[];
  };
  Participants: {
    id: string;
    type: "rich_text";
    rich_text: RichText[];
  };
  category: {
    id: string;
    type: "multi_select";
    multi_select: MultiSelect[];
  };
  year: {
    id: string;
    type: "multi_select";
    multi_select: MultiSelect[];
  };
  title: {
    id: string;
    type: "title";
    title: Title[];
  };
}

interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: Properties;
  url: string;
}

interface NotionResponse {
  object: "list";
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

const dbID = "1308cc9731cd810d9f33f8019784bacc";
const dbKey = "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";

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

  const fetchData = async (applyFilters = false) => {
    try {
      const filters: any[] = [];

      if (applyFilters) {
        if (searchQuery) {
          filters.push({
            property: "title",
            text: {
              contains: searchQuery,
            },
          });
        }

        if (selectedYearOptions.length > 0) {
          selectedYearOptions.forEach((year) => {
            filters.push({
              property: "year",
              multi_select: {
                contains: year,
              },
            });
          });
        }

        if (selectedTopicOptions.length > 0) {
          selectedTopicOptions.forEach((category) => {
            filters.push({
              property: "category",
              multi_select: {
                contains: category,
              },
            });
          });
        }

        if (selectedOptions.length > 0) {
          selectedOptions.forEach((dataType) => {
            filters.push({
              property: "dataType",
              multi_select: {
                contains: dataType,
              },
            });
          });
        }
      }

      // 클릭해서 temporal access 받아와야 합니다 !! 추후 수정 ...
      const response = await CommonAxios.post<NotionResponse>(
        "https://cors-anywhere.herokuapp.com/https://api.notion.com/v1/databases/" +
          dbID +
          "/query",
        {
          filter: { or: filters },
          page_size: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${dbKey}`,
            "Notion-Version": "2021-08-16",
          },
        }
      );

      const transformedDatasets = response.data.results.map((data) => ({
        id: data.id,
        title: data.properties.title.title[0]?.text.content || "Untitled",
        participants: data.properties.Participants.rich_text[0]?.text.content.split(", ") || [],
        professor: data.properties.Professor.rich_text[0]?.text.content || "Unknown",
        dataTypes: data.properties.dataType.multi_select.map((lm) => lm.name),
        years: data.properties.year.multi_select.map((year) => year.name),
        categories: data.properties.category.multi_select.map((category) => category.name),
        url: data.url,
      }));
      setDatasets(transformedDatasets);
    } catch (error) {
      console.error("Error fetching data from Notion:", error);
    }
  };

  // Fetch all models on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Refetch models whenever filters or search query changes
  useEffect(() => {
    fetchData(true); // Fetch with filters if any of them changes
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
              options={["type1", "type2", "type3"]}
              placeholder="파일 타입"
              onOptionClick={handleTopicOptionSelect}
            />
            <Dropdown
              options={["tag1", "tag2", "tag3"]}
              placeholder="파일 사이즈"
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
