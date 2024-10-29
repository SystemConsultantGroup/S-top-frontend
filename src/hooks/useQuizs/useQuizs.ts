import { Quiz, Answers } from "@/types/Interview";
import { getUniqueId } from "@/utils/getUniqueId";
import { useState } from "react";

/**
 * 파일 첨부를 위한 커스텀 훅
 */
export function useQuizs() {
  // 파일 목록 state
  const [quizs, setQuizs] = useState<Quiz[]>([]);
  const [answers, setAnswers] = useState<Answers[]>([]);

  const handleAddQuiz = () => {
    setQuizs([...quizs, { id: getUniqueId(), question: "", correct: 0 }]);
    console.log(quizs);
  };

  const handleAddAnswer = (qid: string) => {
    setAnswers([...answers, { id: getUniqueId(), qid: qid, answer: "" }]);
  };

  const handleRemoveQuiz = (id: string) => {
    setQuizs(quizs.filter((quiz) => quiz.id !== id));
    setAnswers(answers.filter((answer) => answer.qid !== id));
  };

  const handleRemoveAnswer = (id: string) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  const handleChangeQuiz = (id: string) => (question: string) => {
    setQuizs(quizs.map((q) => (q.id === id ? { ...q, question } : q)));
  };
  const handleChangeAnswer = (id: string) => (answer: string) => {
    setAnswers(answers.map((a) => (a.id === id ? { ...a, answer } : a)));
  };

  return {
    quizs,
    answers,
    setQuizs,
    setAnswers,
    handleAddQuiz,
    handleAddAnswer,
    handleRemoveQuiz,
    handleRemoveAnswer,
    handleChangeQuiz,
    handleChangeAnswer,
  };
}
