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
          지난 1년 동안 우리 소프트웨어융합대학의 학생들과 연구자들이 열정을 담아 수행해 온 연구와
          프로젝트의 성과를 온라인으로 소개하고 공유하는 행사, ‘S-TOP(Sungkyu-Tech Open Party)
          2026’에 여러분을 초대합니다.
        </p>
        <p className={styles.paragraph}>
          디지털 대전환과 AI 시대를 맞이하며 소프트웨어 기술은 이제 특정 분야를 넘어 사회 전반의
          변화를 이끄는 핵심 기반이 되고 있습니다. 이러한 변화 속에서 우리 학생들은 기업들과의
          산학협력 프로젝트, 창의개발 SPARK 및 창업 프로젝트, 졸업 작품, 그리고 각 연구실의 연구
          활동을 통해 새로운 기술과 문제에 도전해 왔습니다.
        </p>
        <p className={styles.paragraph}>
          이번 S-TOP 2026에서는 지난 한 해 동안 소프트웨어학과와 글로벌융합학부 학부생들이 수행한
          다양한 산학협력 작품과 창의적 프로젝트, 그리고 대학원 연구실에서 진행되고 있는 주요 연구
          성과들을 소개합니다.
        </p>
        <p className={styles.paragraph}>
          또한 본 행사는 단순히 결과를 전시하는 자리를 넘어, 각자의 자리에서 연구와 개발에 매진해 온
          학생들과 연구자들이 서로의 경험과 성과를 공유하고 격려하는 배움과 교류의 장이 되기를
          기대합니다. 이러한 경험들이 앞으로 AI 시대를 이끌어 갈 성균의 소프트웨어 인재들에게 소중한
          밑거름이 될 것이라 믿습니다.
        </p>
        <p className={styles.paragraph}>
          빠르게 변화하는 기술 환경 속에서도 우리 소프트웨어융합대학은 새로운 도전을 두려워하지
          않고, 미래 사회에 의미 있는 가치를 만들어 갈 인재를 길러내는 교육과 연구를 꾸준히
          이어가고자 합니다. 여러분의 관심과 참여를 부탁드립니다.
        </p>
        <p className={styles.paragraph}>감사합니다.</p>
        <p className={styles.paragraph}>소프트웨어융합대학장 이은석</p>
      </div>
    </div>
  );
};

export default STOPOutlinePage;
