import React from "react";
import { Modal, Text } from "@mantine/core";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton"; // Import the PrimaryButton

interface QuizModalProps {
  opened: boolean;
  onClose: () => void;
  videoUrl: string;
  quizContent: React.ReactNode; // 퀴즈 내용이 들어갈 부분
}

export const QuizModal: React.FC<QuizModalProps> = ({ opened, onClose, videoUrl, quizContent }) => {
  return (
    <Modal opened={opened} onClose={onClose} size="lg" centered>
      {/* Modal Title */}
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <Text size="lg" style={{ marginBottom: "30px" }}>
          대담영상 퀴즈
        </Text>

        {/* Embedded Video */}
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
        {quizContent}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <PrimaryButton> 제출하기</PrimaryButton> {/* onclick 수정 필요*/}
        </div>
      </div>
    </Modal>
  );
};
