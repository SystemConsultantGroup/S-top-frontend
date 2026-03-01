"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./KeynoteSpeech.module.css";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";

interface Interview {
  id: number;
  title: string;
  youtubeId: string;
  year: number;
  talkerBelonging: string;
  talkerName: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
}

// Generate years from 2021 to current year + 1 (or hardcode as requested)
const YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export default function KeynoteSpeechPage() {
  const [selectedYear, setSelectedYear] = useState<number>(YEARS[0]);
  // Store all interviews for Keynote Speech
  const [allInterviews, setAllInterviews] = useState<Interview[]>([]);
  // Currently displayed interview
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);

  const fetchInterviews = useCallback(async () => {
    try {
      // Fetch all Keynote Speech interviews
      // Note: We might want to fetch by year if the API supports it efficiently,
      // but to ensure we have the list for client-side filtering (if needed) or finding the latest.
      // Based on previous pages, we used params.
      const response = await CommonAxios.get("/jobInterviews", {
        params: {
          category: "KEYNOTE_SPEECH",
          size: 100, // Fetch enough to cover recent years
        },
      });

      if (response.data && response.data.content) {
        setAllInterviews(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching Keynote Speech interviews:", error);
    }
  }, []);

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  // Update currentInterview when selectedYear or allInterviews changes
  useEffect(() => {
    if (allInterviews.length > 0) {
      // Find the first interview matching the selected year
      const interviewForYear = allInterviews.find((item) => item.year === selectedYear);
      setCurrentInterview(interviewForYear || null);
    }
  }, [selectedYear, allInterviews]);

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <ul className={styles.yearList}>
          {YEARS.map((year) => (
            <li
              key={year}
              className={`${styles.yearItem} ${selectedYear === year ? styles.active : ""}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </li>
          ))}
        </ul>
      </aside>

      <section className={styles.content}>
        <h1 className={styles.title}>Keynote Speech</h1>

        {currentInterview ? (
          <div>
            <div className={styles.videoSection}>
              <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${currentInterview.youtubeId}`}
                title={currentInterview.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className={styles.videoInfo}>
              <div className={styles.videoTitle}>{currentInterview.title}</div>
              <div className={styles.videoSubtitle}>
                {currentInterview.talkerName}
                {currentInterview.talkerBelonging && ` | ${currentInterview.talkerBelonging}`}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.noVideo}>{selectedYear}년도 Keynote Speech 영상이 없습니다.</div>
        )}
      </section>
    </main>
  );
}
