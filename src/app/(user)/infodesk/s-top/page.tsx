import React from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import styles from "./stopExp.module.css";
import { Banner } from "@/components/common/Banner/Banner";
const STOPOutlinePage = () => {
  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <SubHeadNavbar title="Info Desk" />
        <Banner
          type="S_TOP"
          title="S - TOP"
          subtitle="Sungkyun. Tech. Open Party"
          text="S-TOP은 SW 중심 사회 구현에 선도적 역할을 수행하기 위한 성균관대학교 소프트웨어융합대학 기술교류회입니다. 소프트웨어융합대학 학생들이 기업들과 함께 연구개발한 산학과제, 연구실, SPARK, 창업 프로그램 등에서 만들어진 성과물을 전시합니다."
        />
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.header}>
            <div>S-TOP 소개</div>
          </div>
          <div className={styles.subHeader}>
            <div>인사말</div>
            <hr />
          </div>
        </div>
        <p className={styles.paragraph}>
          지난 1년간 우리 소프트웨어융합대학 구성원들이 열정을 갖고 진행해 온 연구와 프로젝트
          성과들을 온라인상에서 소개하고 그 결과를 공유하는 행사인 ‘S-TOP(Sungkyun Tech Open Party)
          2025’에 여러분을 초대합니다.
        </p>
        <p className={styles.paragraph}>
          본 행사에서는 2024년에 소프트웨어학과와 글로벌융합학부 학부생들을 중심으로 기업들과 개발한
          산학협력 작품과 창의개발 SPARK/창업 작품, 졸업 작품 그리고 각 연구실에서 진행하고 있는
          연구과제들을 소개합니다.
        </p>
        <p className={styles.paragraph}>
          또한, 이 기술 향연을 통해 각 작품과 연구에 매진한 차세대 소프트웨어산업을 이끌어 나갈
          성균의 IT, 융합인재들이 서로의 정보를 공유하고 상호 격려하는 어울림의 장을 제공하는 것도
          본 행사의 중요한 목적입니다.
        </p>
        <p className={styles.paragraph}>
          글로벌 대학으로 성장하는 우리 소프트웨어융합대학이 인류와 미래사회를 위한 담대한 도전을
          통해 새로운 미래가치 창출을 선도적으로 구현하며 우리나라 소프트웨어 기술 발전의 희망이 될
          수 있도록 여러분의 깊은 관심과 참여를 부탁드립니다.
        </p>
        <p className={styles.paragraph}>2025년 새해 여러분의 건강과 행복을 기원합니다.</p>
        <p className={styles.paragraph}>감사합니다.</p>
      </div>
    </div>
  );
};

export default STOPOutlinePage;
