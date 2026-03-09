"use client";

import styles from "./page.module.css";

export default function PolicyPage() {
  const sections = [
    {
      title: "제1조 (목적)",
      body: "이 약관은 SCG의 웹사이트 및 콘텐츠 관련 제반 서비스를 이용함에 있어 필요한 사항을 규정합니다.",
    },
    {
      title: "제2조 (정의)",
      body: "“이용자”란 본 사이트에 접속하여 콘텐츠를 열람하거나 서비스를 신청한 자를 말합니다. “서비스”란 SCG가 제공하는 웹/플랫폼 관련 정보 및 문의기능 일체를 말합니다.",
    },
    {
      title: "제3조 (약관의 효력 및 변경)",
      body: "본 약관은 홈페이지에 게시함으로써 효력이 발생합니다. 관련 법령 및 서비스 정책 변경 시 사전 공지 후 개정 가능합니다.",
    },
    {
      title: "제4조 (서비스의 이용)",
      body: "이용자는 본 약관 및 관련 법령을 준수하여야 하며, 타인의 권리를 침해하거나 부정한 목적으로 이용할 수 없습니다.",
    },
    {
      title: "제5조 (지적재산권)",
      body: "본 웹사이트에 게재된 콘텐츠(텍스트, 이미지, 영상 등)의 저작권은 성균관대학교에 있으며 무단 복제 및 배포를 금합니다.",
    },
    {
      title: "제6조 (면책조항)",
      body: "SCG는 천재지변, 기술적 장애, 이용자 귀책사유로 인한 서비스 장애에 대해 책임을 지지 않습니다.",
    },
    {
      title: "제7조 (분쟁 해결)",
      body: "본 약관에 따른 분쟁은 대한민국 법률에 따르며, SCG 소재지를 관할하는 법원을 제1심 법원으로 합니다.",
    },
  ];

  return (
    <main className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>이용약관</h1>
          <p className={styles.subtitle}>
            본 약관은 시스템컨설턴트그룹(이하 ‘SCG’)이 제공하는 웹사이트 및 관련 서비스의 이용
            조건을 규정합니다.
          </p>
          <time className={styles.effective}>시행일: 2025년 8월 20일</time>
        </div>
      </header>

      <section className={styles.containerBody}>
        {sections.map((s, idx) => (
          <article key={idx} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{s.title}</h3>
            </div>
            <p className={styles.cardBody}>{s.body}</p>
          </article>
        ))}

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>부칙</h3>
          </div>
          <p className={styles.cardBody}>본 약관은 2025년 8월 20일부터 시행합니다.</p>
        </article>

        <article className={styles.contactCard}>
          <h3 className={styles.contactTitle}>약관 관련 문의</h3>
          <div className={styles.contactBody}>
            <div>부서명 : 시스템컨설턴트그룹</div>
            <div>주소 : 성균관대학교 자연과학캠퍼스 제1공학관 22221</div>
            <div>
              연락처 : 031-290-7959,{" "}
              <span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "mailto:" + ["scg", "@", "scg.skku.ac.kr"].join("");
                  }}
                  style={{ wordBreak: "break-all" }}
                >
                  scg [at] scg.skku.ac.kr
                </a>
              </span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
