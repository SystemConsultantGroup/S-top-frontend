"use client";

import React from "react";

import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton";

import classes from "./projectQA.module.css";

export default function InquiriesPage() {
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
        <PrimaryButton
          style={{ position: "absolute", bottom: "120px", right: "20px" }} // Position the button
        >
          작성하기
        </PrimaryButton>
      </div>
    </>
  );
}
