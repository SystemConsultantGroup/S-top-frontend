import React, { useState } from "react";
import styles from "./jobfair.module.css"; // CSS 파일 import
import { Header } from "../../common/Header"; // Header 컴포넌트 import
import { SearchInput } from "../../common/SearchInput";

const JobFairPage = () => {
  const [activeTab, setActiveTab] = useState("advice"); // 기본 탭은 'advice'로 설정

  const renderContent = () => {
    switch (activeTab) {
      case "advice":
        return (
          <div>
            <div className={styles.search}>
              <h2 className={styles.title}>선배님들의 조언</h2>
              <div className={styles.searchArea}>
                <SearchInput placeholder="영상 검색" />
              </div>
            </div>
          </div>
        );
      case "interns":
        return (
          <div>
            <div className={styles.search}>
              <h2 className={styles.title}>인턴들의 이야기</h2>
              <div className={styles.searchArea}>
                <SearchInput placeholder="영상 검색" />
              </div>
            </div>
          </div>
        );
      case "positions":
        return (
          <div>
            <div className={styles.search}>
              <h2 className={styles.title}>채용 포지션</h2>
              <div className={styles.searchArea}>
                <SearchInput placeholder="영상 검색" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header 컴포넌트 사용 */}
      <Header />

      {/* 파란색 바 추가 */}
      <div className={styles.navbar}>
        <li className={styles.navItem1}>JobFair | </li>
        <button className={styles.navItem} onClick={() => setActiveTab("advice")}>
          선배님들의 조언
        </button>
        <button className={styles.navItem} onClick={() => setActiveTab("interns")}>
          인턴들의 이야기
        </button>
        <button className={styles.navItem} onClick={() => setActiveTab("positions")}>
          채용 포지션
        </button>
      </div>

      <div className={styles.content}>
        {renderContent()} {/* 선택된 탭에 맞는 콘텐츠를 렌더링합니다 */}
      </div>
    </div>
  );
};

export default JobFairPage;
