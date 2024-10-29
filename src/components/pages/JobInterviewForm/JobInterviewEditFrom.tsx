"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { TextInput } from "@/components/common/TextInput";
import "@mantine/dates/styles.css";
import { CommonAxios } from "@/utils/CommonAxios";
import { Group, Radio, RadioGroup, Stack } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { isNotEmpty, matches, useForm } from "@mantine/form";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

interface JobInterviewEditFormInputs {
  title: string;
  youtubeId: string;
  date: Date;
  belonging: string;
  name: string;
  category: string;
}
export function JobInterviewEditFrom({ jobInterviewID }: { jobInterviewID?: number }) {
  /* next 라우터, 페이지 이동에 이용 */
  const url = "jobInterviews";
  const { push } = useRouter();
  const reg = RegExp(
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/g
  );

  // 잡페어 게시글 등록 및 수정을 위한  mantine form hook
  const { onSubmit, getInputProps, values, setValues } = useForm<JobInterviewEditFormInputs>({
    initialValues: {
      title: "",
      date: new Date(),
      youtubeId: "",
      belonging: "",
      name: "",
      category: "",
    },
    validate: {
      title: isNotEmpty("제목을 입력해주세요."),
      date: isNotEmpty("년도을 입력해주세요."),
      youtubeId: matches(reg, "형식에 맞는 링크를 입력해주세요"),
      name: isNotEmpty("이름을 입력해주세요."),
      belonging: isNotEmpty("소속을 입력해주세요."),
      category: isNotEmpty("유형을 선택해주세요."),
    },
  });
  // 잡페어 게시글 등록/수정 request 함수
  const handleSubmit = async (values: JobInterviewEditFormInputs) => {
    try {
      const jobInterview = {
        title: values.title,
        year: values.date.getFullYear(),
        youtubeId:
          "https://www.youtube.com/watch?v=" +
          (reg.exec(values.youtubeId) || [0, 0, 0, 0, 0, 0, " "])[6],
        talkerBelonging: values.belonging,
        talkerName: values.name,
        category: values.category,
      };
      if (jobInterviewID) {
        await CommonAxios.put(`${url}/${jobInterviewID}`, jobInterview);
      } else {
        await CommonAxios.post(`${url}`, jobInterview);
      }

      // TODO: 등록/수정 성공 시 알림
      push("/admin/jobfair");
    } catch (error) {
      // TODO: 에러 처리
      console.error(error);
    }
  };

  useEffect(() => {
    // 잡페어 관리 페이지 접근 시 이전 잡페어 정보를 불러옴
    const fetchPrevJobInterview = async () => {
      try {
        const response = await CommonAxios.get(`${url}/${jobInterviewID}`);
        const prevJobInterview = response.data;
        const newdate = new Date();
        newdate.setFullYear(prevJobInterview.year);
        setValues({
          title: prevJobInterview.title,
          date: newdate,
          youtubeId: prevJobInterview.youtubeId,
          belonging: prevJobInterview.talkerBelonging,
          name: prevJobInterview.talkerName,
          category: prevJobInterview.category,
        });
      } catch (error) {
        // TODO: 에러 처리
        console.error(error);
        notFound();
      }
    };
    if (jobInterviewID) fetchPrevJobInterview();
  }, [jobInterviewID, setValues]);

  return (
    <Section>
      {jobInterviewID ? true : false}
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
          <Row field="유형" fieldSize={150}>
            <RadioGroup {...getInputProps("category")} withAsterisk>
              <Group mt="xs">
                <Radio value="SENIOR" label="시니어" />
                <Radio value="INTERN" label="인턴" />
              </Group>
            </RadioGroup>
          </Row>
          <Group justify="center">
            <PrimaryButton
              onClick={() => {
                push("/admin/jobfair");
              }}
            >
              목록으로
            </PrimaryButton>
            <PrimaryButton key="register" type="submit">
              {jobInterviewID ? "수정하기" : "등록하기"}
            </PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Section>
  );
}
