import { Header } from "@/components/common/Header";
import { MainArticle } from "./elements/MainAriticle";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
import styles from "./Main.module.css";
import { Footer } from "@/components/common/Footer";

export function Main() {
  // const AIHUB_BANNER_INFO = BannerList.find((item) => item.type === "AI_HUB")!;

  const InterviewHeadProps = Array.from({ length: 4 }, () => ({
    title: "뤼튼 테크놀리지스",
    subtitle: "현지웅 엔지니어",
    videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
  }));
  const InterviewHead = InterviewHeadProps.map((props, idx) => <VideoCard key={idx} {...props} />);

  return (
    <>
      <Header />
      {/* Banner */}
      {/* KingoVerse */}
      <div className={styles.container}>
        {/* Project */}
        {/* Interview */}
        <MainArticle
          title={{ text: "스타트업 대담 영상", align: "left" }}
          detailUri={{ uri: "", align: "left" }}
          itemHead={InterviewHead}
        />
        {/* Gallery */}
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
