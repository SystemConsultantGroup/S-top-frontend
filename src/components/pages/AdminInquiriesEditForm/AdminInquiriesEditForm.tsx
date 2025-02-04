"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { Group, Stack, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TitleRow from "@/components/common/TitleRow/TitleRow";
import { Inquiry } from "@/types/inquiry";
import { CommonAxios } from "@/utils/CommonAxios";

interface InquiryEditFormInputs {
  title: string;
  content: string;
}

export function AdminInquiriesEditForm({
  id,
  proposal = false,
}: {
  id: string;
  proposal?: boolean;
}) {
  /* next 라우터, 페이지 이동에 이용 */
  const { push } = useRouter();

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [prevReplyFlag, setPrevReplyFlag] = useState<boolean>(false);

  // 문의 답변 등록 및 수정을 위한  mantine form hook
  const { onSubmit, getInputProps, setValues } = useForm<InquiryEditFormInputs>({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: isNotEmpty("제목을 입력해주세요."),
      content: isNotEmpty("내용을 입력해주세요."),
    },
  });

  /* id를 통해 데이터 패칭 */
  useEffect(() => {
    const fetchInquiry = async () => {
      const response = await CommonAxios.get(`/inquiries/${id}`);
      setInquiry(response.data);
      console.log(response.data);
    };

    const fetchPrevReply = async () => {
      const response = await CommonAxios.get(`/inquiries/${id}/reply`);
      if (response.data.title.length > 0) {
        setPrevReplyFlag(true);
        setValues(response.data);
      }
    };

    if (id) {
      fetchInquiry();
      try {
        fetchPrevReply();
      } catch (error) {
        console.error(error);
      }
    }
  }, [id]);

  // 문의 답변 등록/수정 request 함수
  const handleSubmit = async (values: InquiryEditFormInputs) => {
    try {
      if (prevReplyFlag) {
        await CommonAxios.put(`/inquiries/${id}/reply`, values);
      } else {
        await CommonAxios.post(`/inquiries/${id}/reply`, values);
      }
      proposal ? push("../proposals") : push("../inquiries");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Section>
      <TitleRow title="문의 내용" />
      <Stack gap="lg">
        <Row field="프로젝트명" fieldSize={150}>
          {inquiry?.projectName}
        </Row>
        <Row field="작성자" fieldSize={150}>
          {inquiry?.authorName}
        </Row>
        <Row field="제목" fieldSize={150}>
          {inquiry?.title}
        </Row>
        <Row field="내용" fieldSize={150}>
          {inquiry?.content}
        </Row>
      </Stack>
      <TitleRow title="문의 답변" />
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Row field="제목" fieldSize={150}>
            <TextInput id="input-title" {...getInputProps("title")} w={"90%"} />
          </Row>
          <Row field="내용" fieldSize={150}>
            <Textarea
              id="input-content"
              w={"90%"}
              minRows={20}
              autosize
              resize="vertical"
              {...getInputProps("content")}
            />
          </Row>
          <Group justify="center">
            <PrimaryButton
              onClick={() => {
                proposal ? push("../proposals") : push("../inquiries");
              }}
            >
              목록으로
            </PrimaryButton>
            <PrimaryButton key="register" type="submit">
              답변 등록
            </PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Section>
  );
}
