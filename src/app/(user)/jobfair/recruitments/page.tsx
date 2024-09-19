import styles from "./jobfairRe.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { SearchInput } from "@/components/common/SearchInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";

const RecruitmentsPage = () => {
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
          <h2 className={styles.title}>채용 포지션</h2>
          <div className={styles.searchArea}>
            <SearchInput placeholder="치용 포지션 검색" />
          </div>
          <div className={styles.dropdown}>
            <Dropdown options={["연도", "작성자", "제목"]} placeholder="연도" />
            <div className={styles.space}></div>
            <Dropdown options={["분야", "작성자", "제목"]} placeholder="분야" />
            {/* 여기 분야 말고 나머지 두 개는 어디에 적혀있는거지 */}
          </div>
        </div>
        <div className={styles.videoGrid}>
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://www.youtube.com/embed/OBsR6UumFdc"
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
          />
          <VideoCard
            title="국내 ICT 인턴십"
            subtitle="알리멍"
            videoUrl="https://youtu.be/Wx1ndu5FX2s?si=xSiEDTmt8Ez7Zk8p"
          />
        </div>
      </div>
    </div>
  );
};

export default RecruitmentsPage;
