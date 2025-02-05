"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonAxios } from "@/utils/CommonAxios";
import { Group, Stack, Text, Title } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);

export function EventPeriodForm() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [currentPeriod, setCurrentPeriod] = useState<{ start: string; end: string } | null>(null);

  useEffect(() => {
    const fetchEventPeriod = async () => {
      try {
        const response = await CommonAxios.get("/eventPeriod");
        setCurrentPeriod(response.data);
        if (response.data) {
          setStartDate(new Date(response.data.start));
          setEndDate(new Date(response.data.end));
          setStartTime(new Date(response.data.start));
          setEndTime(new Date(response.data.end));
        }
      } catch (error) {
        console.error("Error fetching event period:", error);
      }
    };

    fetchEventPeriod();
  }, []);

  const handleChangePeriod = async () => {
    if (!startDate || !endDate || !startTime || !endTime) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    const start = dayjs(startDate)
      .set("hour", startTime.getHours())
      .set("minute", startTime.getMinutes())
      .tz("Asia/Seoul")
      .format("YYYY-MM-DDTHH:mm:ss"); // 수정: 타임존 오프셋 제거

    const end = dayjs(endDate)
      .set("hour", endTime.getHours())
      .set("minute", endTime.getMinutes())
      .tz("Asia/Seoul")
      .format("YYYY-MM-DDTHH:mm:ss"); // 수정: 타임존 오프셋 제거

    try {
      await CommonAxios.post("/eventPeriods", { start, end });
      alert("이벤트 기간이 변경되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error changing event period:", error);
      alert("이벤트 기간 변경에 실패했습니다.");
    }
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).tz("Asia/Seoul").format("YYYY.MM.DD. HH:mm");
  };
  return (
    <>
      <PageHeader title="이벤트 기간 설정" />
      <Stack p={30} gap={20}>
        {currentPeriod && (
          <Text>
            현재 이벤트 기간: {formatDate(currentPeriod.start)} ~ {formatDate(currentPeriod.end)}
          </Text>
        )}
        <Title order={4}>이벤트 시작 일시</Title>
        <Group>
          <DateTimePicker
            value={startDate}
            onChange={(value) => setStartDate(value)} // onChange 수정
            required
            w={"20%"}
          />
        </Group>

        <Title order={4}>이벤트 종료 일시</Title>
        <Group>
          <DateTimePicker
            value={endDate}
            onChange={(value) => setEndDate(value)} // onChange 수정
            required
            w={"20%"}
          />
        </Group>

        <Group justify="center" mt="xl">
          <PrimaryButton onClick={handleChangePeriod}>변경하기</PrimaryButton>
        </Group>
      </Stack>
    </>
  );
}
