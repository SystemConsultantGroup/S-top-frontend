import React from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import styles from "./stopExp.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import Image from "next/image";

const STOPOutlinePage = () => {
  return (
    <div>
      <div className={styles.container}>
        <SubHeadNavbar title="Info Desk" />
        <Banner
          type="S_TOP"
          title="S - TOP"
          subtitle="Sungkyun. Tech. Open Party"
          text="S-TOP은 SW 중심 사회 구현에 선도적 역할을 수행하기 위한 성균관대학교 소프트웨어융합대학 기술교류회입니다. 소프트웨어융합대학 학생들이 기업들과 함께 연구개발한 산학과제, 연구실, SPARK, 창업 프로그램 등에서 만들어진 성과물을 전시합니다."
        />
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/images/stop_info.png"
          alt="S-TOP Info"
          layout="responsive" // 또는 필요한 레이아웃 설정
          width={700} // 이미지의 원본 너비
          height={475} // 이미지의 원본 높이
        />
      </div>
    </div>
  );
};

export default STOPOutlinePage;
