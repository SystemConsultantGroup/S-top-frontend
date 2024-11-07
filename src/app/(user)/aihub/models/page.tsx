"use client";

import React, { useState, useEffect } from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { AihubCard } from "@/components/common/Cards/Aihub/Aihub";

import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";

const YEARS = ["2020", "2021", "2022", "2023", "2024"];
// 필터링 옵션들 리스트 만들면 됨

import classes from "./AIHub.module.css";

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
  professor: {
    id: string;
    type: "rich_text";
    rich_text: RichText[];
  };
  model: {
    id: string;
    type: "multi_select";
    multi_select: MultiSelect[];
  };
  participants: {
    id: string;
    type: "rich_text";
    rich_text: RichText[];
  };
  topic: {
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

const dbID = "1308cc9731cd81eda3fee42063d18418";
const dbKey = "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";

export default function ModelsPage() {
  const [selectedYearOptions, setSelectedYearOptions] = useState<string[]>([]);
  const [selectedTopicOptions, setSelectedTopicOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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

  const fetchModels = async (applyFilters = false) => {
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
          selectedTopicOptions.forEach((topic) => {
            filters.push({
              property: "topic",
              multi_select: {
                contains: topic,
              },
            });
          });
        }

        if (selectedOptions.length > 0) {
          selectedOptions.forEach((model) => {
            filters.push({
              property: "model",
              multi_select: {
                contains: model,
              },
            });
          });
        }
      }

      // 클릭해서 temporal access 받아와야 합니다 !! 추후 노션 받으면 수정 ...
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

      const transformedModels = response.data.results.map((model) => ({
        id: model.id,
        title: model.properties.title.title[0]?.text.content || "Untitled",
        participants: model.properties.participants.rich_text[0]?.text.content.split(", ") || [],
        professor: model.properties.professor.rich_text[0]?.text.content || "Unknown",
        learningModels: model.properties.model.multi_select.map((lm) => lm.name),
        years: model.properties.year.multi_select.map((year) => year.name),
        categories: model.properties.topic.multi_select.map((category) => category.name),
        url: model.url,
      }));

      setModels(transformedModels);
    } catch (error) {
      console.error("Error fetching models from Notion:", error);
    }
  };

  // Fetch all models on initial load
  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    fetchModels(true); // Fetch with filters if any of them changes
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
              options={["type1", "type2", "type3"]}
              placeholder="데이터 타입"
              onOptionClick={handleTopicOptionSelect}
            />
            <Dropdown
              options={["tag1", "tag2", "tag3"]}
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
