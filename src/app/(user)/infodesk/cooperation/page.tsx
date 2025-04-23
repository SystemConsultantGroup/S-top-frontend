import { Banner } from "@/components/common/Banner/Banner";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import Image from "next/image";
import styles from "./coop.module.css";

const STOPOutlinePage = () => {
  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <SubHeadNavbar title="Info Desk" />
        <Banner
          type="IND_UNIV_PROJECT"
          title="산학협력 프로젝트"
          subtitle="Industry-Academia Collaboration Project"
          text="기업들과 성균관대학교 소프트웨어융합대학이 상호협약을 맺어 기업이 필요로 하는 기술을 해결하고, 프로젝트 수행을 통해 학생들의 문제해결 역량 및 실무능력을 제고하고자 합니다."
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
          ∎ 주제선정
          <br />
          ◦ 기업에서 미래를 위해 개발이 필요하지만 Risk가 커서 도전하기 어려운 과제
          <br />
          ◦ 기업에서 수행하는 프로젝트 중에서 Prototype 개발이 필요한 과제
          <br />
          ◦ 상용시점 및 완성도 Quality에 대한 Risk가 적은 과제
          <br />
          ◦ 기업에서 기출시된 제품들의 고객 반응 분석 후 개선방안 제시 및 개발
          <br />
          ◦ 선생기술 탐색, 최신기술 검증, 참신한 아이디어 구현, Pilot test 등 
          <br />
          <br />
          ∎ 수행기간
          <br />
          ◦ 4월~12월(약 9개월) 
          <br />
          <br />
          ∎ 산학협력프로젝트 팀 구성
          <br />
          ◦ 2~4학년 학부생 3~5명 + 지도교수 1명으로 구성
          <br />
          <br />
          ∎ 현재까지 추진 과제 분야별 분석
          <br />
          ◦ 머신러닝, 컴퓨터비전, 자연어처리, 빅데이터분석, 시스템&네트워크, 보안 및 SW엔제니어링, Interaction&AR, Web/App Application
          <br />
          <Image
            src="/images/Industry_Table2.png"
            alt="분야별 분석"
            width={800} // 이미지 너비
            height={600} // 이미지 높이
            layout="responsive" // 반응형으로 크기 조정
            priority={true} // 중요한 이미지는 우선 로드
          />
          <br />
          <br />
          ∎ 산학협력프로젝트 진행 및 실적
          <br />
          ◦ 일정 및 프로세스
          <br />
          <Image
            src="/images/IndustryStatus_4.png"
            alt="일정 및 프로세스"
            width={800} // 이미지 너비
            height={600} // 이미지 높이
            layout="responsive" // 반응형으로 크기 조정
            priority={true} // 중요한 이미지는 우선 로드
          />
          <br />
          <br />
          ∎ 과제관리 Tool
          <br />
          ◦ Project Communication: Slack, Trello
          <br />
          ◦ Document Repository: Google Drive, Slack, Notion
          <br />
          ◦ Source Code Management: GitHub
          <br />
          <br />
          ∎ 프로젝트 활동 점검방식
          <br />
          ◦ 정기 미팅 실시
          <br />
          ◦ 1학기 프로젝트 수행(4~5월)
          <br />
          ◦ 하계집중근무 프로젝트 수행(6~8월)
          <br />
          ◦ 2학기 프로젝트 수행(9~12월)
          <br />
          <br />
          ∎ 산학협력프로젝트 수행실적
          <br />
          <Image
            src="/images/Industry_CorpCount2.png"
            alt="참여 기업 수"
            width={800} // 이미지 너비
            height={600} // 이미지 높이
            layout="responsive" // 반응형으로 크기 조정
            priority={true} // 중요한 이미지는 우선 로드
          />
          <br />
          <br />
          ∎ 문의처 및 참여교수
          <br />
          <br />
          ∎ 문의처
          <br />
          ◦ 박종갑 산학교수: jhhjpark86@skku.edu/ 031-290-7964
          <br />
          ◦ 김인선 산학교수: insunkim@skku.edu
          <br />
          ◦ 김재현 산학교수: gimjaehyun@skku.edu
          <br />
          ◦ 백승훈 산학교수: seanbaek@skku.edu
          <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default STOPOutlinePage;
