"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/common/Auth";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
import styles from "./KeynoteSpeech.module.css";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";
import { ITalkContent } from "@/types/talks";

export default function KeynoteSpeechPage() {
  const { isLoggedIn } = useAuth();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [talks, setTalks] = useState<ITalkContent[]>([]);

  useEffect(() => {
    const fetchTalks = async () => {
      try {
        const response = await CommonAxios.get("/talks", {
          params: {
            isKeynoteSpeech: true,
            size: 100,
          },
        });

        setTalks(response.data.content ?? []);
      } catch (error) {
        console.error("Error fetching keynote talks:", error);
      }
    };

    fetchTalks();
  }, [isLoggedIn]);

  const years = useMemo(
    () =>
      Array.from(new Set(talks.map((talk) => talk.year)))
        .filter((year) => Number.isFinite(year))
        .sort((a, b) => b - a),
    [talks]
  );

  useEffect(() => {
    if (!years.length) {
      setSelectedYear(null);
      return;
    }

    setSelectedYear((prev) => (prev && years.includes(prev) ? prev : years[0]));
  }, [years]);

  const currentTalk =
    selectedYear === null ? null : (talks.find((talk) => talk.year === selectedYear) ?? null);

  const handleBookmarkToggle = async (id: number) => {
    if (!isLoggedIn) {
      alert("대담영상을 북마크에 추가하려면 로그인이 필요합니다.");
      return;
    }

    const isBookmarked = talks.find((talk) => talk.id === id)?.favorite;

    try {
      if (isBookmarked) {
        await CommonAxios.delete(`/talks/${id}/favorite`);
      } else {
        await CommonAxios.post(`/talks/${id}/favorite`);
      }

      setTalks((prev) =>
        prev.map((talk) => (talk.id === id ? { ...talk, favorite: !talk.favorite } : talk))
      );
    } catch (error) {
      alert("북마크 상태를 업데이트하는 데 실패했습니다.");
      console.error("Error updating keynote talk bookmark:", error);
    }
  };

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <ul className={styles.yearList}>
          {years.map((year) => (
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

        {currentTalk ? (
          <VideoCard
            id={currentTalk.id}
            title={currentTalk.title}
            subtitle={`${currentTalk.talkerName}${
              currentTalk.talkerBelonging ? ` | ${currentTalk.talkerBelonging}` : ""
            }`}
            videoUrl={`https://www.youtube.com/embed/${currentTalk.youtubeId}`}
            bookmarked={currentTalk.favorite}
            onBookmarkToggle={handleBookmarkToggle}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <div className={styles.noVideo}>
            {selectedYear
              ? `${selectedYear}년도 Keynote Speech 영상이 없습니다.`
              : "등록된 영상이 없습니다."}
          </div>
        )}
      </section>
    </main>
  );
}
