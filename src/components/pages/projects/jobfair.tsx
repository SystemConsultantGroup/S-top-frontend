import React from 'react';
import styles from './jobfair.module.css'; // CSS 파일 import
import { Header } from '@/components/common/Header'; // Header 컴포넌트 import

const JobFairPage = () => {
  return (
    <div className={styles.container}>
      {/* Header 컴포넌트 사용 */}
      <Header />

      {/* 파란색 바 추가 */}
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>JobFair | </li>
          <li className={styles.navItem}>선배님들의 조언</li>
          <li className={styles.navItem}>인턴들의 이야기</li>
          <li className={styles.navItem}>채용 포지션</li>
        </ul>
      </nav>

      <main className={styles.content}>
        <h1 className={styles.title}>선배님들의 조언</h1>
        <div className={styles.searchArea}>
          {/* SearchInput과 Dropdown 컴포넌트를 여기에서 사용할 수 있습니다 */}
        </div>
        <div className={styles.videoGrid}>
          {/* VideoCard 컴포넌트를 반복하여 사용할 수 있습니다 */}
        </div>
      </main>
    </div>
  );
};

export default JobFairPage;
