"use client";

import React from "react";
//import { useRouter } from "next/navigation"; // Import the Next.js router

import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { Noticeboard, IBoardItem } from "@/components/common/Noticeboard/Noticeboard";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton"; // Import PrimaryButton

import classes from "./projectQA.module.css";

export default function InquiriesPage() {
  // const router = useRouter(); // Initialize the router

  const heading = "프로젝트 문의";
  const classifier = {
    labels: ["전체", "제목", "내용", "제목+내용", "작성자"],
    defaultLabel: 0,
    searchPlaceholder: "검색어를 입력하세요",
  };

  const items: IBoardItem[] = [
    {
      title: "프로젝트 문의입니다",
      number: 1,
      author: "관리자",
      date: new Date("2024-08-01"),
      view: 150,
      pinned: true,
      href: "/inquiries/1",
    },
    {
      title: "프로젝트 문의입니다",
      number: 2,
      author: "관리자",
      date: new Date("2024-08-05"),
      view: 100,
      pinned: false,
      href: "/inquiries/2",
    },
    // More items can be added here
  ];

  //const handleButtonClick = () => {
  //router.push("/inquiries/write");
  //};

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
        <Noticeboard heading={heading} classifier={classifier} items={items} />

        <PrimaryButton
          label="작성하기"
          style={{ position: "absolute", bottom: "120px", right: "20px" }} // Position the button
        />
      </div>
    </>
  );
}
