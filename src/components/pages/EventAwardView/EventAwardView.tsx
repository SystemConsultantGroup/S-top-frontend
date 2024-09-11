"use client";

import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { ProjectCard } from "@/components/common/ProjectCard";
import { useEffect, useState } from "react";
import classes from "./EventAwardView.module.css";
import { Text } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import {
  years as mock_years,
  awards as mock_awards,
  projects as mock_projects,
} from "./_mock/mock-awards";

export function EventAwardView() {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    /* TODO: 연도 목록 가져오기 */
    setYears(mock_years);
    if (mock_years.length > 0) {
      // 가장 최근 연도를 디폴트로
      setSelectedYear(mock_years[0]);
    }
  }, []);

  useEffect(() => {
    /* TODO: 선택된 연도의 수상 결과 가져오기 */
  }, [selectedYear]);

  return (
    <div className={classes.container}>
      <Dropdown
        options={years}
        placeholder={"연도"}
        onOptionClick={setSelectedYear}
        selectedOption={selectedYear}
      ></Dropdown>
      <Text className={classes.subtitle}>{selectedYear}년도 수상 내역</Text>
      <Carousel dragFree slideGap="md" slideSize="20%" align="start" containScroll="trimSnaps">
        {mock_projects.map((data, idx) => (
          <CarouselSlide key={idx}>
            <Text className={classes.awardType}>{mock_awards[idx]}</Text>
            <ProjectCard data={data} />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
}
