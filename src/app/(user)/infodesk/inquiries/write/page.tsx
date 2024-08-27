"use client";

import React from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { TextInput } from "@/components/common/TextInput";
import { CheckBox } from "@/components/common/CheckBox/CheckBox";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton";

import classes from "./writeQA.module.css";

export default function InquiryWritePage() {
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
        <h1 className={classes.heading}>산학협력 과제 제안</h1>

        <div className={classes.formRow}>
          <TextInput label="이메일" placeholder="이메일을 입력하세요" />
        </div>

        <div className={classes.formRow}>
          <TextInput label="웹사이트" placeholder="웹사이트를 입력하세요" />
        </div>

        <div className={classes.formRow}>
          <TextInput label="프로젝트명" placeholder="프로젝트명을 입력하세요" />
        </div>

        <div className={classes.formRow}>
          <label>프로젝트 분야</label>
          <div className={classes.checkboxGroup}>
            <CheckBox label="AI" />
            <CheckBox label="Web Development" />
            <CheckBox label="Mobile App" />
          </div>
        </div>

        <div className={classes.formRow}>
          <TextInput label="제목" placeholder="제목을 입력하세요" />
        </div>

        <div className={classes.formRow}>
          <TextInput label="과제 요약" placeholder="과제 요약을 입력하세요" />
        </div>

        <div className={classes.formRow}>
          <TextInput label="과제 설명" placeholder="과제 설명을 입력하세요" />
        </div>

        <div className={classes.formRow}>
          <PrimaryButton label="첨부파일 추가" />
        </div>

        <div className={classes.formFile}>
          <div className={classes.InputWrapper}>
            <TextInput label="첨부파일 1" placeholder="" />
          </div>
          <div className={classes.buttonWrapper}>
            <PrimaryButton label="삭제" style={{ backgroundColor: "#FF6B6B" }} />
          </div>
        </div>

        <div className={classes.formFile}>
          <div className={classes.InputWrapper}>
            <TextInput label="첨부파일 2" placeholder="" />
          </div>
          <div className={classes.buttonWrapper}>
            <PrimaryButton label="삭제" style={{ backgroundColor: "#FF6B6B" }} />
          </div>
        </div>

        <div className={classes.formActions}>
          <PrimaryButton label="작성하기" style={{ marginRight: "10px" }} />
          <PrimaryButton label="목록으로" />
        </div>
      </div>
    </>
  );
}
