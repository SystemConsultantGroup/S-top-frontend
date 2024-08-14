import React from "react";
import styles from "./jobfair.module.css"; // CSS 파일 import
import { Header } from "../../common/Header"; // Header 컴포넌트 import
import {SearchInput} from "../../common/SearchInput"; // 검색창 컴포넌트 import



const JobFairPage = () => {
  return (
    <div className={styles.container}>
      {/* Header 컴포넌트 사용 */}
      <Header />

      {/* 파란색 바 추가 */}
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem1}>JobFair  | </li>
          <li className={styles.navItem}><a href="#advice">선배님들의 조언</a></li>
          <li className={styles.navItem}><a href="#story">인턴들의 이야기</a></li>
          <li className={styles.navItem}><a href="#position">채용 포지션</a></li>
        </ul>
      </nav>



      <section id="all">
          <main className={styles.content}>
            <h1 className={styles.title}>선배님들의 조언</h1>
            <div className={styles.searchArea}>
              <SearchInput placeholder="영상 검색" /> 
            </div>
            <div className={styles.videoGrid}>
              {/* VideoCard 컴포넌트를 반복하여 사용할 수 있습니다 */}
            </div>
          </main>
      </section>
      <section id="tech">
          
      </section>
      <section id="lifestyle">
          
      </section>
    </div>
    

  );
};

export default JobFairPage;
