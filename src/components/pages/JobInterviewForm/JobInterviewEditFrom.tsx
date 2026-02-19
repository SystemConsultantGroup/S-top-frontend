"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { TextInput } from "@mantine/core";
import "@mantine/dates/styles.css";
import { CommonAxios } from "@/utils/CommonAxios";
import { Group, Radio, RadioGroup, Stack } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { isNotEmpty, matches, useForm } from "@mantine/form";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

export function JobInterviewEditFrom({
  jobInterviewID,
  redirectUrl = "/admin/jobfair",
  defaultCategory,
}: {
  jobInterviewID?: number;
  redirectUrl?: string;
  defaultCategory?: string;
}) {
  /* next 라우터, 페이지 이동에 이용 */
  const { push } = useRouter();
  const url = "jobInterviews";
  const reg = RegExp(
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/g
  );
  const form = useForm({
    initialValues: {
      title: "",
      date: new Date(),
      youtubeId: " ",
      belonging: "",
      name: "",
      category: defaultCategory || "",
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

  const { onSubmit, ...formMethods } = form;

  useEffect(() => {
    if (jobInterviewID) {
      const fetchPrevJobInterview = async () => {
        try {
          const response = await CommonAxios.get(`/${url}/${jobInterviewID}`);
          console.log(response.data);
          const data = response.data;
          const newdate = new Date();
          newdate.setFullYear(data.year);
          form.setValues({
            title: data.title,
            date: newdate,
            youtubeId: data.youtubeId,
            belonging: data.talkerBelonging,
            name: data.talkerName,
            category: data.category,
          });
        } catch (error) {
          // TODO: 에러 처리
          console.error(error);
          notFound();
        }
      };
      fetchPrevJobInterview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobInterviewID]);

  // 잡페어 게시글 등록/수정 request 함수
  const handleSubmit = async () => {
    try {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // 두번해야 되더라 왜인지는 모름름
      const youtubeId1 = (reg.exec(form.values.youtubeId) || [0, 0, 0, 0, 0, 0, ""])[6];
      const youtubeId2 = (reg.exec(form.values.youtubeId) || [0, 0, 0, 0, 0, 0, ""])[6];
      const youtubeId = youtubeId1 == "" ? youtubeId2 : youtubeId1;

      const jobInterview = {
        title: form.values.title,
        year: form.values.date.getFullYear(),
        youtubeId: youtubeId ? youtubeId : "", // 유튜브 ID 변환 및 처리
        talkerBelonging: form.values.belonging,
        talkerName: form.values.name,
        category: form.values.category,
      };

      if (jobInterviewID) {
        await CommonAxios.put(`/${url}/${jobInterviewID}`, jobInterview);
      } else {
        await CommonAxios.post(`/${url}`, jobInterview);
      }

      // TODO: 등록/수정 성공 시 알림
      push(redirectUrl);
    } catch (error) {
      // TODO: 에러 처리
      console.error(error);
    }
  };

  return (
    <Section>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack>
          <Row field="제목" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("title")} w={"100%"} />
          </Row>
          <Row field="연도" fieldSize={150}>
            <YearPickerInput
              valueFormat="YYYY년 M월"
              yearsListFormat="YYYY년"
              decadeLabelFormat="YYYY년"
              placeholder="Pick date"
              value={formMethods.values.date}
              {...formMethods.getInputProps("date")}
            ></YearPickerInput>
          </Row>
          <Row field="유튜브 링크" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("youtubeId")} w={"100%"} />
          </Row>
          <Row field="대담자" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("name")} w={"100%"} />
          </Row>
          <Row field="대담자 소속" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("belonging")} w={"100%"} />
          </Row>
          <Row field="유형" fieldSize={150}>
            <RadioGroup {...formMethods.getInputProps("category")} withAsterisk>
              <Group mt="xs">
                <Radio value="SENIOR" label="시니어" />
                <Radio value="INTERN" label="인턴" />
                <Radio value="ENTREPRENEURSHIP" label="창업" />
                <Radio value="KEY_SPEECH" label="Key Speech" />
              </Group>
            </RadioGroup>
          </Row>
          <Group justify="center">
            <PrimaryButton
              onClick={() => {
                push(redirectUrl);
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
