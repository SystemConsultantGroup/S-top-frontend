"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { Noticeboard } from "@/components/common/Noticeboard/Noticeboard";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";
import { useAuth } from "@/components/common/Auth/AuthProvider";
import classes from "./projectQA.module.css";
import { PagedNoticesRequestParams } from "@/types/notice";
import { Group, Pagination } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";

interface Inquiry {
  id: number;
  authorName: string;
  title: string;
  createdAt: string;
}

export default function InquiriesPage() {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useDebouncedState<PagedNoticesRequestParams>(
    {
      page: pageNumber - 1,
      size: pageSize,
    },
    300
  );
  const [inquiries, setInquiries] = useState<Inquiry[]>([]); // Specify the type for inquiries
  const [pageData, setPageData] = useState({ totalPages: 1 });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state allowing string or null

  type OptionType = "TITLE" | "CONTENT" | "ALL";
  const [option, setOption] = useState<OptionType>("TITLE");

  const { token, isLoading } = useAuth();

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await CommonAxios.get("/inquiries", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
        params: { ...query },
      });
      setInquiries(response.data.content);
      setPageData({ totalPages: response.data.totalPages });
    } catch (err) {
      setError("Failed to fetch inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) fetchInquiries();
  }, [token, query]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery((prev) => ({
      ...prev,
      title: option === "TITLE" && value !== "" ? value : undefined,
      //title: option === "TITLE" ? (value !== "" ? value : undefined) : prev.title,
      //content: option === "CONTENT" ? (value !== "" ? value : undefined) : prev.content,
    }));
  };

  const handleSelect = (value: string | null) => {
    if (value === "1") {
      setOption(() => "TITLE");
    } else if (value === "2") {
      setOption(() => "CONTENT");
    } else {
      setOption(() => "ALL");
    }
  };

  const heading = "프로젝트 문의";

  const classifier = {
    data: [
      { value: "0", label: "제목+내용" },
      { value: "1", label: "제목" },
      { value: "2", label: "내용" },
    ],
    defaultLabel: 0,
    searchPlaceholder: "검색어를 입력하세요",
  };

  return (
    <>
      <div className={classes.subHeadNavbar}>
        <SubHeadNavbar title="Info Desk" />
      </div>

      <div className={classes.banner}>
        <Banner
          type="IND_UNIV_PROJECT"
          title="산학협력 프로젝트"
          subtitle="Industry-Academia Collaboration Project"
          text="성균관대학교 소프트웨어융합대학과 기업들이 협약을 맺고, 기업이 필요로 하는 주제를 바탕으로 실무 중심의 프로젝트를 수행합니다."
          width="100%"
        />
      </div>

      <div className={classes.mainContent}>
        <Noticeboard
          handleInput={() => {}}
          handleSelect={() => {}}
          heading={heading}
          classifier={classifier}
          items={items}
        />

        <PrimaryButton
          style={{ position: "absolute", bottom: "120px", right: "20px" }} // Position the button
        >
          작성하기
        </PrimaryButton>
      </div>
    </>
  );
}
