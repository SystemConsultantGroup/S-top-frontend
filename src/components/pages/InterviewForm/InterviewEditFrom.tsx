"use client";

import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import "@mantine/dates/styles.css";
import { CommonAxios } from "@/utils/CommonAxios";
import { Group, Radio, RadioGroup, Stack, TextInput } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { isNotEmpty, matches, useForm } from "@mantine/form";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuizs } from "@/hooks/useQuizs/useQuizs";
import { Answers, Quiz, ReqQuiz } from "@/types/Interview";
import { getUniqueId } from "@/utils/getUniqueId";

interface InterviewEditFormInputs {
  title: string;
  youtubeId: string;
  date: Date;
  belonging: string;
  name: string;
  quizs: Quiz[];
  answers: Answers[];
}

export function InterviewEditFrom({ interviewID }: { interviewID?: number }) {
  /* next 라우터, 페이지 이동에 이용 */
  const url = "talks";
  const { push } = useRouter();
  const reg = RegExp(
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/g
  );
  const {
    quizs,
    answers,
    setQuizs,
    setAnswers,
    handleAddQuiz,
    handleRemoveQuiz,
    handleAddAnswer,
    handleRemoveAnswer,
    handleChangeQuiz,
    handleChangeAnswer,
  } = useQuizs();
  // 잡페어 게시글 등록 및 수정을 위한  mantine form hook
  const { onSubmit, getInputProps, values, setValues } = useForm<InterviewEditFormInputs>({
    initialValues: {
      title: "",
      date: new Date(),
      youtubeId: "",
      belonging: "",
      name: "",
      quizs: quizs,
      answers: answers,
    },
    validate: {
      title: isNotEmpty("제목을 입력해주세요."),
      date: isNotEmpty("년도을 입력해주세요."),
      youtubeId: matches(reg, "형식에 맞는 링크를 입력해주세요"),
      name: isNotEmpty("이름을 입력해주세요."),
      belonging: isNotEmpty("소속을 입력해주세요."),
      quizs: () => {
        return true;
      },
      answers: () => {
        return true;
      },
    },
  });
  // 잡페어 게시글 등록/수정 request 함수
  const handleSubmit = async (values: InterviewEditFormInputs) => {
    try {
      const interview = {
        title: values.title,
        year: values.date.getFullYear(),
        youtubeId:
          "https://www.youtube.com/watch?v=" +
          (reg.exec(values.youtubeId) || [0, 0, 0, 0, 0, 0, " "])[6],
        talkerBelonging: values.belonging,
        talkerName: values.name,
        quiz: values.quizs,
      };
      if (interviewID) {
        await CommonAxios.put(`${url}/${interviewID}`, interview);
      } else {
        await CommonAxios.post(`${url}`, interview);
      }

      // TODO: 등록/수정 성공 시 알림
      push("/admin/interviews");
    } catch (error) {
      // TODO: 에러 처리
      console.error(error);
    }
  };

  useEffect(() => {
    // 잡페어 관리 페이지 접근 시 이전 잡페어 정보를 불러옴
    const fetchPrevInterview = async () => {
      try {
        const response = await CommonAxios.get(`${url}/${interviewID}`);
        const prevInterview = response.data;
        const newdate = new Date();
        newdate.setFullYear(prevInterview.year);
        const prevQuiz: Quiz[] = prevInterview.quiz.map((quiz: ReqQuiz) => {
          return {
            id: getUniqueId(),
            question: quiz.question,
            correct: quiz.answer,
          };
        });
        // TODO 정답 플랫으로 풀어버리기
        const prevAnswer: Answers[] = prevInterview.quiz
          .map((quiz: ReqQuiz) => {
            return { id: getUniqueId(), question: quiz.question, answer: quiz.answer };
          })
          .flat();
        setValues({
          title: prevInterview.title,
          date: newdate,
          youtubeId: prevInterview.youtubeId,
          belonging: prevInterview.talkerBelonging,
          name: prevInterview.talkerName,
          quizs: prevQuiz,
          answers: prevAnswer,
        });
        if (prevQuiz && prevQuiz.length > 0) {
          setQuizs(prevQuiz);
        }
        if (prevAnswer && prevAnswer.length > 0) {
          setAnswers(prevAnswer);
        }
      } catch (error) {
        // TODO: 에러 처리
        console.error(error);
        notFound();
      }
    };
    if (interviewID) fetchPrevInterview();
  }, [interviewID, setQuizs, setAnswers, setValues]);
  return (
    <Section>
      {interviewID ? true : false}
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Row field="제목" fieldSize={150}>
            <TextInput id="input-title" {...getInputProps("title")} w={"100%"} />
          </Row>
          <Row field="연도" fieldSize={150}>
            <YearPickerInput
              valueFormat="YYYY년 M월"
              yearsListFormat="YYYY년"
              decadeLabelFormat="YYYY년"
              placeholder="Pick date"
              value={values.date}
              {...getInputProps("date")}
            ></YearPickerInput>
          </Row>
          <Row field="유튜브 링크" fieldSize={150}>
            <TextInput id="input-youtubeId" {...getInputProps("youtubeId")} w={"100%"} />
          </Row>
          <Row field="대담자" fieldSize={150}>
            <TextInput id="input-name" {...getInputProps("name")} w={"100%"} />
          </Row>
          <Row field="대담자 소속" fieldSize={150}>
            <TextInput id="input-belonging" {...getInputProps("belonging")} w={"100%"} />
          </Row>
          <Group pl={20}>
            <PrimaryButton onClick={handleAddQuiz}>퀴즈 추가</PrimaryButton>
          </Group>
          {quizs.map((quiz, index) => (
            <>
              {/* TODO: 다크모드 대응 필요 */}
              <Section bg={"dark"}>
                <Group w={"50%"} key={quiz.id}>
                  <Row field={"Q" + (index + 1) + ": "} fieldSize={50}>
                    <TextInput
                      id="input-quiz-question"
                      w={"300%"}
                      value={quiz.question}
                      onChange={(event) => handleChangeQuiz(quiz.id)(event.currentTarget.value)}
                    ></TextInput>
                  </Row>
                  <RadioGroup
                    id="input-quiz-currect"
                    value={Math.min(
                      answers.filter((answer) => answer.qid === quiz.id).length - 1,
                      quiz.correct
                    ).toString()}
                    onChange={(e) =>
                      (quiz.correct = Math.min(
                        answers.filter((answer) => answer.qid === quiz.id).length - 1,
                        parseInt(e)
                      ))
                    }
                  >
                    {answers
                      .filter((answer) => answer.qid === quiz.id)
                      .map((answer, aindex) => {
                        return (
                          <>
                            <Group w={"50%"}>
                              <Radio value={aindex.toString()} label={"A" + (aindex + 1) + ": "} />
                              <DangerButton onClick={() => handleRemoveAnswer(answer.id)}>
                                삭제
                              </DangerButton>
                              <TextInput
                                id="input-quiz-answer"
                                w={"200%"}
                                value={answer.answer}
                                onChange={(event) =>
                                  handleChangeAnswer(answer.id)(event.currentTarget.value)
                                }
                              ></TextInput>
                            </Group>
                          </>
                        );
                      })}
                  </RadioGroup>

                  {/* <RadioGroup >{}</RadioGroup> */}
                  <Row fieldSize={0}>
                    <Group w={"50%"}>
                      <PrimaryButton onClick={() => handleAddAnswer(quiz.id)}>
                        답 추가
                      </PrimaryButton>
                      <DangerButton onClick={() => handleRemoveQuiz(quiz.id)}>삭제</DangerButton>
                    </Group>
                  </Row>
                </Group>
              </Section>
            </>
          ))}
          <Group justify="center">
            <PrimaryButton
              onClick={() => {
                push("/admin/interviews");
              }}
            >
              목록으로
            </PrimaryButton>
            <PrimaryButton key="register" type="submit">
              {interviewID ? "수정하기" : "등록하기"}
            </PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Section>
  );
}
