"use client";

import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { TextInput } from "@/components/common/TextInput";
import { useFiles } from "@/hooks/useFiles/useFiles";
import { ApiFile } from "@/types/file";
import { CommonAxios } from "@/utils/CommonAxios";
import { Checkbox, FileInput, Group, Stack, Textarea } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EventImageSection } from "./EventImageSection";
import classes from "./AdminNoticeEditForm.module.css";

interface NoticeEditFormInputs {
  title: string;
  content: string;
  fixed: boolean;
  fileIds?: number[];
}

export function AdminNoticeEditForm({ noticeId, event }: { noticeId?: number; event?: boolean }) {
  const url = event ? "/eventNotices" : "/notices";

  /* next 라우터, 페이지 이동에 이용 */
  const { push } = useRouter();

  // 첨부파일 필드를 위한 hook
  const {
    files,
    setFiles,
    handleAddFile,
    handleRemoveFile,
    handleFileChange,
    getTempFile,
    uploadFiles,
  } = useFiles();

  // 이벤트 공지사항의 첨부파일 이미지 미리보기를 위한 fileId state
  const [fileIds, setFileIds] = useState<number[]>([]);

  // 공지사항 게시글 등록 및 수정을 위한  mantine form hook
  const { onSubmit, getInputProps, values, setValues } = useForm<NoticeEditFormInputs>({
    initialValues: {
      title: "",
      content: "",
      fixed: false,
    },
    validate: {
      title: isNotEmpty("제목을 입력해주세요."),
      content: isNotEmpty("내용을 입력해주세요."),
    },
  });

  // 공지사항 게시글 등록/수정 request 함수
  const handleSubmit = async (values: NoticeEditFormInputs) => {
    try {
      const fileIds = await uploadFiles(files);
      const notice = {
        title: values.title,
        content: values.content,
        fixed: values.fixed,
        fileIds: fileIds,
      };
      if (noticeId) {
        await CommonAxios.put(`${url}/${noticeId}`, notice);
      } else {
        await CommonAxios.post(`${url}`, notice);
      }

      // TODO: 등록/수정 성공 시 알림
      push("../notices");
    } catch (error) {
      // TODO: 에러 처리
      console.error(error);
    }
  };

  useEffect(() => {
    // 공지사항 관리 페이지 접근 시 이전 공지사항 정보를 불러옴
    const fetchPrevNotice = async () => {
      const response = await CommonAxios.get(`${url}/${noticeId}`);
      const prevNotice = response.data;
      setValues({
        title: prevNotice.title,
        content: prevNotice.content,
        fixed: prevNotice.fixed,
      });

      // 이전 공지사항의 첨부파일 정보를 불러옴 (api에서 반환하는 파일을 File 객체로 변환)
      if (prevNotice.files && prevNotice.files.length > 0) {
        const convertedFiles = prevNotice.files.map((apiFile: ApiFile) => ({
          id: apiFile.id.toString(),
          file: getTempFile(apiFile),
        }));
        const fileIds = prevNotice.files.map((apiFile: ApiFile) => apiFile.id);

        setFiles(convertedFiles);
        setFileIds(fileIds);
      }
    };
    if (noticeId) fetchPrevNotice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticeId]);

  return (
    <Section>
      {event && noticeId && <EventImageSection fileIds={fileIds} />}
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Row field="제목" fieldSize={150}>
            <TextInput
              id="input-title"
              wrapperClasses={{ root: classes.input }}
              initialValue={values.title}
              {...getInputProps("title")}
            />
          </Row>
          <Row field="내용" fieldSize={150}>
            <Textarea
              id="input-content"
              w={"90%"}
              autosize
              minRows={10}
              {...getInputProps("content")}
            />
          </Row>
          <Row field="상단 고정 여부" fieldSize={150}>
            <Checkbox id="input-fixed" checked={values.fixed} {...getInputProps("fixed")} />
          </Row>
          <Group pl={20}>
            <PrimaryButton onClick={handleAddFile}>
              {event ? "이미지 추가" : "첨부파일 추가"}
            </PrimaryButton>
          </Group>
          {files.map((file, index) => (
            <Row
              key={file.id}
              field={event ? `이미지 ${index + 1}` : `첨부파일 ${index + 1}`}
              fieldSize={150}
            >
              <Group w={"50%"}>
                <FileInput
                  id={file.id}
                  onChange={(newFile) => handleFileChange(file.id)(newFile)}
                  value={file.file}
                  placeholder={file.file ? file.file.name : "파일을 선택해주세요."}
                  w={"50%"}
                  // 이벤트 공지사항의 경우 이미지만 업로드
                  {...(event ? { accept: "image/*" } : {})}
                />
                <DangerButton onClick={() => handleRemoveFile(file.id)}>삭제</DangerButton>
              </Group>
            </Row>
          ))}
          <Group justify="center">
            <PrimaryButton
              onClick={() => {
                push("../notices");
              }}
            >
              목록으로
            </PrimaryButton>
            <PrimaryButton key="register" type="submit">
              {noticeId ? "수정하기" : "등록하기"}
            </PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Section>
  );
}
