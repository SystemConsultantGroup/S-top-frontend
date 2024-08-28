import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import styles from "./pp.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { Noticeboard } from "@/components/common/Noticeboard";
import { PrimaryButton } from "@/components/common/Buttons";

interface IBoardItem {
  title: string;
  number: number;
  author: string;
  date: Date;
  view: number;
  pinned: boolean;
  href: string;
}

const ProposalsPage = () => {
  const heading = "산학협력 과제 제안";
  const classifier = {
    labels: ["제목", "내용", "제목+내용"],
    defaultLabel: 0,
    searchPlaceholder: "검색어를 입력하세요.",
  };
  const items: IBoardItem[] = [
    {
      title: "과제 제안 안내",
      number: 1,
      author: "관리자",
      date: new Date(2024, 6, 28), // Date 객체 사용
      view: 123,
      pinned: true,
      href: "/notices/1",
    },
    {
      title: "과제를 제안합니다",
      number: 2,
      author: "기업 1",
      date: new Date(2024, 7, 27),
      view: 98,
      pinned: false,
      href: "/notices/2",
    },
    {
      title: "과제를 제안합니다",
      number: 3,
      author: "기업 2",
      date: new Date(2024, 8, 22),
      view: 82,
      pinned: false,
      href: "/notices/3",
    },
    {
      title: "과제를 제안합니다",
      number: 4,
      author: "기업 3",
      date: new Date(2024, 8, 28),
      view: 56,
      pinned: false,
      href: "/notices/4",
    },
  ];

  return (
    <div className={styles.backColor}>
      <div className={styles.container}>
        <SubHeadNavbar title="Info Desk" />
        <Banner
          type="IND_UNIV_PROJECT"
          title="산학협력 프로젝트"
          subtitle="Industry-Academia Collaboration Project"
          text="성균관대학교 소프트웨어융합대학과 기업들이 협약을 맺고, 기업이 필요로 하는 주제를 바탕으로 실무 중심의 프로젝트를 수행합니다."
        />
      </div>
      <div className={styles.propose}>
        <Noticeboard heading={heading} classifier={classifier} items={items} />
        <div className={styles.button}>
          <PrimaryButton label="작성하기" style={{ width: "110px" }} />
        </div>
      </div>
    </div>
  );
};

export default ProposalsPage;
