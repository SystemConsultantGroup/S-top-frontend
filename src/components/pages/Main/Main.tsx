import { Banner } from "@/components/common/Banner/Banner";
import { Footer } from "@/components/common/Footer";
import { GalleryPreview } from "@/components/common/GalleryPreview/GalleryPreview";
import { Header } from "@/components/common/Header";
import { ProjectCard } from "@/components/common/ProjectCard";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
import { VRLink } from "@/components/common/VRLink";
import { BannerList } from "./BannerList";
import { MainArticle } from "./elements/MainAriticle";
import styles from "./Main.module.css";

export function Main() {
  const S_TOP_BANNER_INFO = BannerList.find((item) => item.type === "S_TOP")!;

  const InterviewHeadProps = Array.from({ length: 4 }, () => ({
    title: "뤼튼 테크놀리지스",
    subtitle: "현지웅 엔지니어",
    videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
    bookmarked: false,
    onBookmarkToggle: () => {},
  }));
  const InterviewHead = InterviewHeadProps.map((props, idx) => <VideoCard key={idx} {...props} />);

  const ProjectHeadProps = Array.from({ length: 4 }, (_, idx) => ({
    id: idx,
    title: "GPT 기반의 일상 대화형 챗봇 모델 개발",
    thumbnailUrl: "/images/mock-project-thumbnail.png",
    categories: ["AI/머신러닝", "자연어처리"],
    participants: ["조민규", "조하빈", "장준우", "김예윤", "신준서"],
    team: "바이브컴퍼니",
    advisor: "박희선",
    likes: 63,
    isMarked: true,
  }));
  const ProjectHead = ProjectHeadProps.map((props, idx) => (
    <ProjectCard key={idx} data={{ ...props }} />
  ));

  const GalleryHeadProps = Array.from({ length: 4 }, () => ({
    imgUrl: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    title: "SKKU THON",
    date: new Date(),
    viewCount: 23,
  }));
  const GalleryHead = GalleryHeadProps.map((props, idx) => <GalleryPreview key={idx} {...props} />);

  return (
    <>
      <Header />
      <div className={styles.banner}>
        <Banner {...S_TOP_BANNER_INFO} />
      </div>
      <div className={styles.vrlink}>
        <VRLink />
      </div>
      <div className={styles.container}>
        <MainArticle
          className={styles.project}
          title={{ text: "프로젝트", align: "left" }}
          detailUri={{ uri: "", align: "left" }}
          itemHead={ProjectHead}
        />
        <MainArticle
          className={styles.interview}
          title={{ text: "스타트업 대담 영상", align: "left" }}
          detailUri={{ uri: "", align: "left" }}
          itemHead={InterviewHead}
        />
        <MainArticle
          className={styles.gallery}
          title={{ text: "갤러리", align: "center" }}
          detailUri={{ uri: "", align: "right" }}
          itemHead={GalleryHead}
        />
      </div>
      <Footer />
    </>
  );
}
