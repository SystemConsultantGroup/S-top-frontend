import { Quiz } from "@/types/Interview";
import { getUniqueId } from "@/utils/getUniqueId";
import { useState } from "react";

export function useQuizs() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const addQuiz = () => {
    const newQuiz: Quiz = {
      id: getUniqueId(),
      question: "",
      answer: 0,
      options: [""],
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const removeQuiz = (id: string) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  const addOption = (quizId: string) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, options: [...quiz.options, ""] } : quiz
      )
    );
  };
  const removeOption = (quizId: string, optionIndex: number) => {
    setQuizzes((prevQuizzes) => {
      return prevQuizzes.map((quiz) => {
        if (quiz.id === quizId) {
          const newOptions = quiz.options.filter((_, index) => index !== optionIndex);
          // 정답 인덱스가 삭제된 옵션 인덱스보다 크면 정답 인덱스를 하나 줄입니다.
          const newAnswer = quiz.answer > optionIndex ? quiz.options.length - 1 : quiz.answer;
          // 삭제 후 남은 옵션 개수보다 정답 인덱스가 크거나 같으면 마지막 옵션 인덱스로 설정합니다.
          const adjustedAnswer = newAnswer >= newOptions.length ? newOptions.length - 1 : newAnswer;
          return {
            ...quiz,
            options: newOptions,
            answer: adjustedAnswer < 0 ? 0 : adjustedAnswer, // answer가 음수가 되지 않도록 처리
          };
        }
        return quiz;
      });
    });
  };

  const handleOptionChange =
    (quizId: string, optionIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newOptions = [...quizzes.find((q) => q.id === quizId)!.options];
      newOptions[optionIndex] = event.currentTarget.value;
      setQuizzes(
        quizzes.map((quiz) => (quiz.id === quizId ? { ...quiz, options: newOptions } : quiz))
      );
    };

  const handleAnswerChange = (quizId: string) => (value: string) => {
    setQuizzes(
      quizzes.map((quiz) => (quiz.id === quizId ? { ...quiz, answer: parseInt(value, 10) } : quiz))
    );
  };

  const handleQuestionChange = (quizId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, question: event.currentTarget.value } : quiz
      )
    );
  };

  return {
    quizzes,
    setQuizzes,
    addQuiz,
    removeQuiz,
    addOption,
    removeOption,
    handleAnswerChange,
    handleOptionChange,
    handleQuestionChange,
  };
}
