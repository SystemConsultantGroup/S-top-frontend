import { Quiz } from "@/types/Interview";
import { getUniqueId } from "@/utils/getUniqueId";
import { useState } from "react";

/**
 * 파일 첨부를 위한 커스텀 훅
 */
export function useQuizs() {
  // 파일 목록 state
  const [quizs, setQuizs] = useState<{ id: string; quiz: Quiz | null }[]>([]);

  const handleAddQuiz = () => {
    setQuizs([...quizs, { id: getUniqueId(), quiz: null }]);
    console.log(quizs);
  };

  const handleRemoveQuiz = (id: string) => {
    setQuizs(quizs.filter((quiz) => quiz.id !== id));
  };

  return {
    quizs,
    setQuizs,
    handleAddQuiz,
    handleRemoveQuiz,
  };
}
