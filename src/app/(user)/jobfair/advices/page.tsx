import { Banner } from "@/components/common/Banner/Banner";
import styles from "./jobfair.module.css"; // CSS 파일 import
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";

const JobFairPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <SubHeadNavbar title="Job Fair" />
        <Banner
          type="PROJECT"
          title="잡페어"
          subtitle="Job Fair"
          text="S-TOP Job Fair는 현업에 종사하고 있는 선배 개발자님들과 실무 경험을 얻고자 하는 학생들을 연결하여, IT 인재 양성 문화를 함께 만들기 위해 기획되었습니다."
        />
      </div>
      <div className={styles.backColor}>
        <div className={styles.search}>
          <h2 className={styles.title}>선배님들의 조언</h2>
          <div className={styles.searchArea}>
            <SearchInput placeholder="영상 검색" />
          </div>
          <div className={styles.dropdown}>
            <Dropdown options={["연도", "작성자", "제목"]} placeholder="연도" />
          </div>
        </div>
        <div className={styles.videoGrid}>
          <VideoCard
            title="삼성리서치"
            subtitle="김성보 연구원님"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
          />
          <VideoCard
            title="삼성리서치"
            subtitle="김성보 연구원님"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
          />
          <VideoCard
            title="삼성리서치"
            subtitle="김성보 연구원님"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
          />
          <VideoCard
            title="삼성리서치"
            subtitle="김성보 연구원님"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
          />
          <VideoCard
            title="삼성리서치"
            subtitle="김성보 연구원님"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
          />
          <VideoCard
            title="삼성리서치"
            subtitle="김성보 연구원님"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
          />
          <VideoCard
            title="삼성리서치"
            subtitle="김성보 연구원님"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
          />
          <VideoCard
            title="삼성리서치"
            subtitle="김성보 연구원님"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
          />
        </div>
      </div>
    </div>
  );
};

export default JobFairPage;
