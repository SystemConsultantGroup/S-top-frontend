"use client";

import { isNotEmpty, matches, useForm } from "@mantine/form";
import { useEffect } from "react";
import { TextInput, Card, Group, Stack, Radio, RadioGroup } from "@mantine/core";
import { getUniqueId } from "@/utils/getUniqueId";
import { CommonAxios } from "@/utils/CommonAxios";
import { YearPickerInput } from "@mantine/dates";
import { Section } from "@/components/common/Section";
import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { useRouter } from "next/navigation";
import { Row } from "@/components/common/Row";
import { Quiz } from "@/types/Interview";
import "@mantine/dates/styles.css";
import { useQuizs } from "@/hooks/useQuizs/useQuizs";

export function InterviewEditFrom({ interviewID }: { interviewID?: number }) {
  const {
    quizzes,
    setQuizzes,
    addQuiz,
    removeQuiz,
    addOption,
    removeOption,
    handleAnswerChange,
    handleOptionChange,
    handleQuestionChange,
  } = useQuizs();
  const { push } = useRouter();
  const url = "talks";
  const reg = RegExp(
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/g
  );
  const form = useForm({
    initialValues: {
      title: "",
      youtubeId: "",
      year: new Date().getFullYear(),
      talkerName: "",
      talkerBelonging: "",
      quizzes: [] as Quiz[],
    },
    validate: {
      title: isNotEmpty("제목을 입력해주세요."),
      year: isNotEmpty("년도을 입력해주세요."),
      youtubeId: matches(reg, "형식에 맞는 링크를 입력해주세요"),
      talkerName: isNotEmpty("이름을 입력해주세요."),
      talkerBelonging: isNotEmpty("소속을 입력해주세요."),
    },
  });

  const { onSubmit, ...formMethods } = form;

  useEffect(() => {
    if (interviewID) {
      const fetchInterview = async () => {
        try {
          const response = await CommonAxios.get(`/${url}/${interviewID}`);
          const data = response.data;
          form.setValues({
            title: data.title,
            youtubeId: "https://www.youtube.com/watch?v=" + data.youtubeId,
            year: data.year,
            talkerBelonging: data.talkerBelonging,
            talkerName: data.talkerName,
          });
          setQuizzes(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.quiz.map((q: any, idx: number) => ({ ...q, id: getUniqueId(), answer: idx }))
          );
        } catch (error) {
          console.error("Error fetching interview:", error);
          // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
        }
      };
      fetchInterview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewID]);

  const handleYearChange = (value: Date | null) => {
    if (value) {
      form.setFieldValue("year", value.getFullYear());
    }
  };

  const handleSubmitData = async () => {
    try {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // 두번해야 되더라 왜인지는 모름름
      const youtubeId1 = (reg.exec(form.values.youtubeId) || [0, 0, 0, 0, 0, 0, ""])[6];
      const youtubeId2 = (reg.exec(form.values.youtubeId) || [0, 0, 0, 0, 0, 0, ""])[6];
      const youtubeId = youtubeId1 == "" ? youtubeId2 : youtubeId1;

      const data = {
        title: form.values.title,
        youtubeId: `https://www.youtube.com/watch?v=${youtubeId ? youtubeId : ""}`, // 유튜브 ID 변환 및 처리
        year: form.values.year,
        talkerBelonging: form.values.talkerBelonging,
        talkerName: form.values.talkerName,
        quiz: quizzes,
      };

      if (interviewID) {
        await CommonAxios.put(`/${url}/${interviewID}`, data);
      } else {
        await CommonAxios.post(`/${url}`, data);
      }

      // 성공적으로 전송된 후 페이지 이동
      push("/admin/interviews");
    } catch (error) {
      console.error(error);
      // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
    }
  };

  return (
    <Section>
      <form onSubmit={onSubmit(handleSubmitData)}>
        <Stack>
          <Row field="제목" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("title")} w={"100%"} />
          </Row>
          <Row field="연도" fieldSize={150}>
            {" "}
            <YearPickerInput
              label=""
              placeholder="연도 선택"
              value={new Date(form.values.year, 0, 1)}
              onChange={handleYearChange}
              clearable
              required
            />
          </Row>
          <Row field="유튜브 ID" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("youtubeId")} w={"100%"} />
          </Row>
          <Row field="대담자" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("talkerName")} w={"100%"} />
          </Row>
          <Row field="대담자 소속" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("talkerBelonging")} w={"100%"} />
          </Row>

          <PrimaryButton onClick={addQuiz}>퀴즈 추가</PrimaryButton>

          {quizzes.map((quiz) => (
            <Card key={quiz.id} withBorder shadow="sm" p="md" m="md">
              <TextInput
                label="질문"
                value={quiz.question}
                onChange={handleQuestionChange(quiz.id)}
                w={"100%"}
              />
              <RadioGroup value={quiz.answer.toString()} onChange={handleAnswerChange(quiz.id)}>
                {quiz.options.map((option, index) => (
                  <Group key={index} mt="xs">
                    <Radio value={index.toString()} />

                    <TextInput
                      value={option}
                      onChange={handleOptionChange(quiz.id, index)}
                      w={"60%"}
                    />
                    <DangerButton
                      color="red"
                      variant="outline"
                      onClick={() => removeOption(quiz.id, index)}
                    >
                      삭제
                    </DangerButton>
                  </Group>
                ))}
              </RadioGroup>
              <Group justify="center">
                <PrimaryButton mt="xs" onClick={() => addOption(quiz.id)}>
                  선지 추가
                </PrimaryButton>
                <DangerButton mt="xs" onClick={() => removeQuiz(quiz.id)}>
                  퀴즈 삭제
                </DangerButton>
              </Group>
            </Card>
          ))}
          <Group justify="center">
            <PrimaryButton
              onClick={() => {
                // console.log(form.values.youtubeId.match(reg));
                // console.log((reg.exec(form.values.youtubeId) || [0, 0, 0, 0, 0, 0, ""])[6]);
                push("/admin/interviews");
              }}
            >
              목록으로
            </PrimaryButton>
            <PrimaryButton type="submit">저장</PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Section>
  );
}
