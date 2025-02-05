import React, { useState } from "react";
import { Modal, Text } from "@mantine/core";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton";

interface QuizQuestion {
  question: string;
  answer: number; // Correct answer index
  options: string[]; // List of options
}
interface QuizModalProps {
  opened: boolean;
  onClose: () => void;
  videoUrl: string;
  quizData: QuizQuestion[];
  title: string; // title prop 추가
  subtitle: string;
  onSubmit: (quizAnswers: Record<number, number>) => Promise<void>;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  opened,
  onClose,
  videoUrl,
  quizData,
  title,
  subtitle,
  onSubmit,
}) => {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const handleAnswerChange = (questionId: number, answer: number) => {
    setQuizAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  const handleSubmit = () => {
    onSubmit(quizAnswers);
  };

  return (
    <Modal opened={opened} onClose={onClose} size="80%" centered>
      <div style={{ textAlign: "left", marginBottom: "0" }}>
        <Text
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          대담영상 퀴즈
        </Text>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            paddingBottom: "56.25%",
            paddingTop: "0px",
            height: "0",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%", // 부모의 비율 유지
            }}
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>

      <div
        style={{
          textAlign: "left",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: 0,
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          {title}
        </p>
        <Text
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: 0,
            marginLeft: 0,
            alignSelf: "flex-end",
          }}
        >
          {subtitle}
        </Text>
      </div>

      <div>
        {quizData.length > 0 ? (
          quizData.map((q, index) => (
            <div key={index}>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  marginLeft: "13px",
                }}
              >
                {q.question}
              </p>
              {q.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  style={{ fontSize: "18px", marginBottom: "8px", marginLeft: "15px" }}
                >
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optionIndex}
                      onChange={() => handleAnswerChange(index, optionIndex)} // Capture answer change
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>퀴즈 불러오는 중...</div>
        )}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <PrimaryButton onClick={handleSubmit}>제출하기</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
