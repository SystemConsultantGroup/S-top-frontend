"use client";

import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { TextInput } from "@mantine/core";
import { useFiles } from "@/hooks/useFiles/useFiles";
import { ApiFile } from "@/types/file";
import "@mantine/dates/styles.css";
import { CommonAxios } from "@/utils/CommonAxios";
import { FileInput, Group, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function GalleryEditFrom({ galleryID }: { galleryID?: number }) {
  /* next 라우터, 페이지 이동에 이용 */
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
  const { push } = useRouter();
  const url = "galleries";

  // 갤러리의 첨부파일 이미지 미리보기를 위한 fileId state
  const [fileIds, setFileIds] = useState<number[]>([]);
  fileIds;
  // 갤러리 게시글 등록 및 수정을 위한  mantine form hook

  const form = useForm({
    initialValues: {
      title: "",
      date: new Date(),
    },
    validate: {
      title: isNotEmpty("제목을 입력해주세요."),
      date: isNotEmpty("년도을 입력해주세요."),
    },
  });

  const { onSubmit, ...formMethods } = form;

  useEffect(() => {
    if (galleryID) {
      const fetchGallery = async () => {
        try {
          const response = await CommonAxios.get(`/${url}/${galleryID}`);
          const data = response.data;
          const newdate = new Date();
          newdate.setFullYear(data.year, data.month - 1);
          form.setValues({
            title: data.title,
            date: newdate,
          });

          if (data.files && data.files.length > 0) {
            const convertedFiles = data.files.map((apiFile: ApiFile) => ({
              id: apiFile.id.toString(),
              file: getTempFile(apiFile),
            }));
            const fileIds = data.files.map((apiFile: ApiFile) => apiFile.id);

            setFiles(convertedFiles);
            setFileIds(fileIds);
          }
        } catch (error) {
          // TODO: 에러 처리
          console.error(error);
        }
      };
      fetchGallery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryID]);

  if (files.length == 0) {
    files.push({ id: "", file: null });
  }

  const handleSubmitData = async () => {
    try {
      const fileIds = await uploadFiles(files);
      const data = {
        title: form.values.title,
        year: form.values.date.getFullYear(),
        month: form.values.date.getMonth() + 1,
        fileIds: fileIds,
      };

      if (galleryID) {
        await CommonAxios.put(`/${url}/${galleryID}`, data);
      } else {
        await CommonAxios.post(`/${url}`, data);
      }

      // TODO: 등록/수정 성공 시 알림
      push("/admin/gallery");
    } catch (error) {
      // TODO: 에러 처리
      console.error(error);
    }
  };

  return (
    <Section>
      <form onSubmit={onSubmit(handleSubmitData)}>
        <Stack>
          <Row field="제목" fieldSize={150}>
            <TextInput label="" {...formMethods.getInputProps("title")} w={"100%"} />
          </Row>
          <Row field="날짜" fieldSize={150}>
            <MonthPickerInput
              valueFormat="YYYY년 M월"
              yearLabelFormat="YYYY년"
              yearsListFormat="YYYY년"
              decadeLabelFormat="YYYY년"
              monthsListFormat="M월"
              placeholder="Pick date"
              value={formMethods.values.date}
              {...formMethods.getInputProps("date")}
            ></MonthPickerInput>
          </Row>
          <Row>
            <PrimaryButton onClick={handleAddFile}>사진 추가</PrimaryButton>
          </Row>
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
            <PrimaryButton type="submit">저장</PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Section>
  );
}
