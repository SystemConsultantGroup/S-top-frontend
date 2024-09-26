"use client";

import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { TextInput } from "@/components/common/TextInput";
import { useFiles } from "@/hooks/useFiles/useFiles";
import { ApiFile } from "@/types/file";
import "@mantine/dates/styles.css";
import { CommonAxios } from "@/utils/CommonAxios";
import { FileInput, Group, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GalleryEditFormInputs {
  title: string;
  date: Date;
  fileIds?: number[];
}

export function GalleryEditFrom({ galleryID }: { galleryID?: number }) {
  /* next 라우터, 페이지 이동에 이용 */
  const url = "galleries";
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

  // 갤러리의 첨부파일 이미지 미리보기를 위한 fileId state
  const [fileIds, setFileIds] = useState<number[]>([]);
  fileIds;
  // 갤러리 게시글 등록 및 수정을 위한  mantine form hook
  const { onSubmit, getInputProps, values, setValues } = useForm<GalleryEditFormInputs>({
    initialValues: {
      title: "",
      date: new Date(),
    },
    validate: {
      title: isNotEmpty("제목을 입력해주세요."),
      date: isNotEmpty("년도을 입력해주세요."),
    },
  });
  // 갤러리 게시글 등록/수정 request 함수
  const handleSubmit = async (values: GalleryEditFormInputs) => {
    try {
      const fileIds = await uploadFiles(files);
      const gallery = {
        title: values.title,
        year: values.date.getFullYear(),
        month: values.date.getMonth() + 1,
        fileIds: fileIds,
      };
      if (galleryID) {
        await CommonAxios.put(`${url}/${galleryID}`, gallery);
      } else {
        await CommonAxios.post(`${url}`, gallery);
      }

      // TODO: 등록/수정 성공 시 알림
      push("/admin/gallery");
    } catch (error) {
      // TODO: 에러 처리
      console.error(error);
    }
  };

  useEffect(() => {
    // 갤러리 관리 페이지 접근 시 이전 갤러리 정보를 불러옴
    const fetchPrevGallery = async () => {
      try {
        const response = await CommonAxios.get(`${url}/${galleryID}`);
        const prevGallery = response.data;
        const newdate = new Date();
        newdate.setFullYear(prevGallery.year, prevGallery.month - 1);
        setValues({
          title: prevGallery.title,
          date: newdate,
        });

        // 이전 갤러리의 첨부파일 정보를 불러옴 (api에서 반환하는 파일을 File 객체로 변환)
        if (prevGallery.files && prevGallery.files.length > 0) {
          const convertedFiles = prevGallery.files.map((apiFile: ApiFile) => ({
            id: apiFile.id.toString(),
            file: getTempFile(apiFile),
          }));
          const fileIds = prevGallery.files.map((apiFile: ApiFile) => apiFile.id);

          setFiles(convertedFiles);
          setFileIds(fileIds);
        }
      } catch (error) {
        // TODO: 에러 처리
        console.error(error);
        notFound();
      }
    };
    if (galleryID) fetchPrevGallery();
  }, [galleryID]);
  if (files.length == 0) {
    files.push({ id: "", file: null });
  }
  return (
    <Section>
      {galleryID ? true : false}
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Row field="제목" fieldSize={150}>
            <TextInput id="input-title" {...getInputProps("title")} w={"100%"} />
          </Row>
          <Row field="날짜" fieldSize={150}>
            <MonthPickerInput
              valueFormat="YYYY년 M월"
              yearLabelFormat="YYYY년"
              yearsListFormat="YYYY년"
              decadeLabelFormat="YYYY년"
              monthsListFormat="M월"
              placeholder="Pick date"
              value={values.date}
              {...getInputProps("date")}
            ></MonthPickerInput>
          </Row>
          <Group pl={20}>
            <PrimaryButton onClick={handleAddFile}>사진 추가</PrimaryButton>
          </Group>
          {files.map((file, index) => (
            <Row key={file.id} field={`이미지 ${index + 1}`} fieldSize={150}>
              <Group w={"50%"}>
                <FileInput
                  id={file.id}
                  onChange={(newFile) => handleFileChange(file.id)(newFile)}
                  value={file.file}
                  placeholder={file.file ? file.file.name : "파일을 선택해주세요."}
                  w={"50%"}
                  {...{ accept: "image/*" }}
                />
                {files.length > 1 ? (
                  <DangerButton onClick={() => handleRemoveFile(file.id)}>삭제</DangerButton>
                ) : (
                  <></>
                )}
              </Group>
            </Row>
          ))}
          1번 사진이 썸네일로 지정됩니다.
          <Group justify="center">
            <PrimaryButton
              onClick={() => {
                push("/admin/gallery");
              }}
            >
              목록으로
            </PrimaryButton>
            <PrimaryButton key="register" type="submit">
              {galleryID ? "수정하기" : "등록하기"}
            </PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Section>
  );
}
