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
            src="/images/Industry_CorpCount2.png"
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
          ∎ 산학 과제 수행 절차 및 역할
          <br />
          <Image
            src="/images/IndustryStatus_4.png"
            alt="수행 절차 및 역할"
            layout="responsive"
            width={800}
            height={600}
            priority
          />
          <br />
          <br />
          ∎ 산학협력프로젝트 진행 및 실적
          <br />
          ◦ 일정 및 프로세스
          <br />
          <br />
          ∎ 과제 관리 Tool
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
          ∎ 현재까지 추진 과제 분야별 분석
          <br />
          ◦ 머신러닝, 컴퓨터비전, 자연어처리, 빅데이터분석, 시스템&네트워크, 보안 및 SW엔제니어링, Interaction&AR, Web/App Application
          <br />
          <Image
            src="/images/Industry_Table2.png"
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
