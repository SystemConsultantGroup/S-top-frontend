import React, { useState } from "react";
import { Modal, Text } from "@mantine/core";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton"; // Import the PrimaryButton
interface QuizQuestion {
  question: string;
  answer: number; // Correct answer index
  options: string[]; // List of options
}
interface QuizModalProps {
  opened: boolean;
  onClose: () => void;
  videoUrl: string;
  quizData: QuizQuestion[]; // Changed from quizContent to quizData
  onSubmit: (quizAnswers: Record<number, number>) => Promise<void>;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  opened,
  onClose,
  videoUrl,
  quizData,
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
    <Modal opened={opened} onClose={onClose} size="lg" centered>
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <Text size="lg" style={{ marginBottom: "30px" }}>
          대담영상 퀴즈
        </Text>

        <iframe
          width="100%"
          height="315"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>

      {/* Quiz Content */}
      <div>
        {quizData.length > 0 ? (
          quizData.map((q, index) => (
            <div key={index}>
              <p>{q.question}</p>
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex}>
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
