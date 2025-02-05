"use client";

import React, { useState, useRef } from "react";
import { Group, Button } from "@mantine/core";
import styles from "./VideoCard.module.css";
import { QuizModal } from "./QuizModal";
import { DetailsModal } from "./DetailModal";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";
import { AxiosError } from "axios";

export interface VideoCardProps {
  key?: number;
  id: number;
  title: string;
  subtitle?: string;
  videoUrl: string;
  bookmarked: boolean;
  onBookmarkToggle: (id: number) => void;
  isLoggedIn: boolean;
}
export const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  subtitle,
  videoUrl,
  bookmarked,
  onBookmarkToggle,
  isLoggedIn,
}) => {
  const cardRef = useRef<HTMLDivElement>(null); // Ref for the card

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click originated from the iframe, bookmark icon, or quiz button
    if (
      event.target instanceof Element &&
      (event.target.closest("iframe") || // Clicked inside iframe
        event.target.closest(`.${styles.bookmarkIcon}`) || // Clicked on bookmark
        event.target.closest("button")) // Clicked on quiz button
    ) {
      return; // Do nothing if click is within these elements
    }

    // Otherwise, open the details modal
    setDetailsModalOpened(true);
  };

  const [quizModalOpened, setQuizModalOpened] = useState(false);
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [quizData, setQuizData] = useState<
    Array<{
      question: string;
      answer: number; // Correct answer index
      options: string[]; // Options for the question
    }>
  >([]);

  const handleBookmarkClick = () => {
    onBookmarkToggle(id);
  };

  const openQuizModal = async () => {
    if (!isLoggedIn) {
      alert("퀴즈 이벤트 참여를 위해서는 로그인이 필요합니다.");
      return;
    }

    try {
      const response = await CommonAxios.get(`/talks/${id}/quiz`);

      setQuizData(response.data.quiz || []);
      setQuizModalOpened(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.code === 8401) {
        alert("퀴즈 데이터가 존재하지 않습니다.");
      }
      console.error("Error fetching quiz data:", error);
    }
  };

  const closeQuizModal = () => {
    setQuizModalOpened(false);
  };

  const handleQuizButtonClick = () => {
    setDetailsModalOpened(false); // Close the details modal
    openQuizModal(); // Open the quiz modal (your existing function)
  };

  const submitQuiz = async (quizAnswers: Record<string, number>) => {
    try {
      const response = await CommonAxios.post(`/talks/${id}/quiz`, { result: quizAnswers }); // Use the id prop
      alert(response.data.success ? "Quiz submitted successfully!" : "Quiz submission failed.");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.code === 8401) {
        alert("퀴즈 데이터가 존재하지 않습니다.");
      }
      if (error instanceof AxiosError && error.response?.data?.code === 8804) {
        alert("퀴즈 이벤트 참여 기간이 아닙니다.");
      }
      if (error instanceof AxiosError && error.response?.data?.code === 8805) {
        alert("현재 이벤트 참여 연도의 대담 영상이 아닙니다다.");
      }
      if (error instanceof AxiosError && error.response?.data?.code === 8901) {
        alert("퀴즈 최대 시도 횟수를 초과하였습니다.");
      }
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div
      className={styles.container}
      data-videoid={id}
      ref={cardRef} // Attach the ref to the container
      onClick={handleCardClick} // Add the click handler
      style={{ cursor: "pointer" }} // Indicate clickable area
    >
      <div className={styles.videoFrame}>
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>

        <Group justify="space-between">
          <div className={styles.bookmarkIcon} onClick={handleBookmarkClick}>
            {bookmarked ? (
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7.2666C1 4.43817 1 3.02396 1.87868 2.14528C2.75736 1.2666 4.17157 1.2666 7 1.2666H11C13.8284 1.2666 15.2426 1.2666 16.1213 2.14528C17 3.02396 17 4.43817 17 7.2666V14.0942C17 16.7775 17 18.1191 16.1557 18.5295C15.3114 18.9399 14.2565 18.111 12.1465 16.4532L11.4713 15.9226C10.2849 14.9905 9.69173 14.5244 9 14.5244C8.30827 14.5244 7.71509 14.9905 6.52871 15.9226L5.85346 16.4532C3.74355 18.111 2.68859 18.9399 1.84429 18.5295C1 18.1191 1 16.7775 1 14.0942V7.2666Z"
                  fill="#36618E"
                  stroke="#36618E"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7C1 4.17157 1 2.75736 1.87868 1.87868C2.75736 1 4.17157 1 7 1H11C13.8284 1 15.2426 1 16.1213 1.87868C17 2.75736 17 4.17157 17 7V13.8276C17 16.5109 17 17.8525 16.1557 18.2629C15.3114 18.6733 14.2565 17.8444 12.1465 16.1866L11.4713 15.656C10.2849 14.7239 9.69173 14.2578 9 14.2578C8.30827 14.2578 7.71509 14.7239 6.52871 15.656L5.85346 16.1866C3.74355 17.8444 2.68859 18.6733 1.84429 18.2629C1 17.8525 1 16.5109 1 13.8276V7Z"
                  stroke="#36618E"
                  strokeWidth="2"
                />
              </svg>
            )}
          </div>
          <Button size="xs" variant="light" radius="lg" color="#36618e" onClick={openQuizModal}>
            퀴즈 풀기
          </Button>
        </Group>

        <DetailsModal
          opened={detailsModalOpened}
          onClose={() => setDetailsModalOpened(false)}
          videoUrl={videoUrl}
          title={title}
          subtitle={subtitle ?? ""}
          onQuizButtonClick={handleQuizButtonClick}
        />
        {/* Quiz modal */}
        <QuizModal
          opened={quizModalOpened}
          onClose={closeQuizModal}
          videoUrl={videoUrl}
          quizData={quizData} // Pass the quiz data here
          title={title} // title prop 전달
          subtitle={subtitle ?? ""}
          onSubmit={submitQuiz}
        />
      </div>
    </div>
  );
};
