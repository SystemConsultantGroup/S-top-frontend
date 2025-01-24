import React from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import styles from "./coop.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import Image from "next/image";

const STOPOutlinePage = () => {
  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <SubHeadNavbar title="Info Desk" />
        <Banner
          type="IND_UNIV_PROJECT"
          title="산학협력 프로젝트"
          subtitle="Industry-Academia Collaboration Project"
          text="성균관대학교 소프트웨어융합대학과 기업들이 협약을 맺고, 기업이 필요로 하는 주제를 바탕으로 실무 중심의 프로젝트를 수행합니다."
        />
      </div>

      <div className={styles.content}>
        <div>
          <div className={styles.header}>
            <div>산학협력프로젝트</div>
          </div>
          <div className={styles.subHeader}>
            <div>현황</div>
            <hr />
          </div>
        </div>

        <p>
          ∎ 2015년부터 8년간 기업과 프로젝트 수행 경험 보유
          <br />
          &nbsp; - 93개 기업이 참여하여, 총 169개 프로젝트 수행(2015년~2022년)
          <br />
          &nbsp; - 2015년 18개, 2016년 22개, 2017년 25개, 2018년 24개, 2019년 23개, 2020년 18개,
          2021년 19개, 2022년 20개
          <br />
          <br />
          ∎ 2019년 3월 정부로부터 AI 대학원 설립 인가를 받아, 2019년 2학기부터 AI 대학원을
          운영함으로써 AI 기술에 대한 경쟁력이 우수함
          <br />
          <br />
          ∎ 전공 분야
          <br />
          ◦ Systems and Networks: 클라우드 컴퓨팅, 임베디드시스템, 모바일플랫폼, 프로그래밍언어 등
          <br />
          ◦ Knowledge and Intelligence : 인공지능, 빅데이터, 데이터사이언스 등<br />
          ◦ Security and Software Engineering : 보안, 소프트웨어공학, 게임그래픽스 등<br />
          <br />
          ∎ 학생
          <br />
          ◦ 2017년 입학생부터 졸업요건으로 &quot;인턴십&quot; 수행이 필수로 채택되었음
          <br />
          ◦ 2022년 입학생부터 졸업요건으로 &quot;산학협력프로젝트&quot; 수행이 추가되었음 <br />
          ◦ 학부 2,3학년 소프트웨어 개발 역량: 실습 중심의 교과목 운영
          <br />
          &nbsp; - 2학년 수강 과목: 자료구조, 알고리즘, 시스템 프로그래밍, 파이썬 등<br />
          &nbsp; - 3학년 수강 과목: 데이터베이스, 인공지능, 오픈소스/Github, 컴퓨터아키텍처 등<br />
          ◦ 학부 2학년때부터 최소 1회 산학협력 과제 참여를 통해 실무 프로젝트 수행 경험
          <br />
          &nbsp; - 1단계 사업(2015년) 이후 연도별 참여 학생 수<br />
          <Image
            src="/images/Industry_numofStu.png"
            alt="참여 학생 수"
            width={800} // 이미지 너비
            height={600} // 이미지 높이
            layout="responsive" // 반응형으로 크기 조정
            priority={true} // 중요한 이미지는 우선 로드
          />
          <br />
          <br />
          ∎ 참여 기업 분석
          <br />
          ◦ 업종별 분류(2015년 이후 93개 기업)
          <br />
          <Image
            src="/images/IndustryStatus_BySector.png"
            alt="업종별 분류"
            layout="responsive"
            width={800}
            height={600}
            priority
          />
          <br />
          <br />
          ◦ 연도별 참여 기업 수<br />
          <Image
            src="/images/Industry_CorpCount1.png"
            alt="참여 기업 수"
            layout="responsive" // 반응형 크기 조정
            width={800} // 원본 비율에 맞는 너비
            height={600} // 원본 비율에 맞는 높이
            priority // 우선 로드
          />
          <br />
          <br />
          ∎ 주제 선정
          <br />
          ◦ 기업에서 필요한 주제 결정
          <br />
          ◦ 기술 trend 조사를 위해 외국 논문 및 자료분석
          <br />
          ◦ 기업에서 기 출시된 제품들의 고객 반응 조사
          <br />
          ◦ 기업 입장에서 미래를 위해 개발이 필요하지만 risk가 커서 도전하기 어려운 과제
          <br />
          ◦ 현재 수행하는 프로젝트 중에서 외주 업체에 용역을 주거나, 간단한 개발이 필요한 과제
          <br />
          &nbsp; &nbsp; (상용 시점 및 완성도 quality 에 대한 risk가 적은 과제)
          <br />
          ◦ 선행기술 탐색, 기술 검증, 참신한 아이디어 구현, 테스팅 등<br />
          <br />
          ∎ 산학 과제 수행 절차 및 역할
          <br />
          <Image
            src="/images/IndustryStatus_3.png"
            alt="수행 절차 및 역할"
            layout="responsive"
            width={800}
            height={600}
            priority
          />
          <br />
          <br />
          ∎ 과제 관리 Tool
          <br />
          ◦ Project Communication : Slack, Trello
          <br />
          ◦ Document Repository : Google Drive, Slack, Notion 등 <br />
          ◦ Source Code Management : Git
          <br />
          <br />
          ∎ 현재까지 추진 과제 분야별 분석
          <br />
          ◦ 2016년부터 수행한 프로젝트들을 분야별로 구분
          <br />
          &nbsp; - 머신러닝, 컴퓨터비전, 자연어처리, 빅데이터분석,시스템,네트워크,보안 및
          SW엔지니어링, Interaction,AR, Web/App Application <br />
          <Image
            src="/images/Industry_Table.png"
            alt="분야별 분석"
            layout="responsive"
            width={800}
            height={600}
            priority
          />
          <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default STOPOutlinePage;
