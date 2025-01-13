"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { CommonAxios } from "@/utils/CommonAxios";
import { handleDownloadBlob } from "@/utils/handleDownloadFile";
import { FileInput, Group, Stack, Title } from "@mantine/core";
import { useState } from "react";

export function ProjectsExcelCreateSection() {
  const [thumbnailFiles, setThumbnailFiles] = useState<File[] | null>(null);
  const [posterFiles, setPosterFiles] = useState<File[] | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const thumbnailFormData = new FormData();
    const posterFormData = new FormData();
    const uploadFormData = new FormData();

    if (thumbnailFiles && posterFiles && excelFile) {
      thumbnailFiles.forEach((file) => {
        thumbnailFormData.append("files", file);
      });
      posterFiles.forEach((file) => {
        posterFormData.append("files", file);
      });

      const thumbnailRes = await CommonAxios.post("/files", thumbnailFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const thumbnailResBlob = new Blob([JSON.stringify(thumbnailRes.data)], {
        type: "application/json",
      });

      const posterRes = await CommonAxios.post("/files", posterFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const posterResBlob = new Blob([JSON.stringify(posterRes.data)], {
        type: "application/json",
      });

      uploadFormData.append("thumbnails", thumbnailResBlob);
      uploadFormData.append("posters", posterResBlob);
      uploadFormData.append("excel", excelFile);

      CommonAxios.post("/projects/excel", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      setError("파일을 선택해 주세요.");
    }
  };

  const handleDownload = async () => {
    const res = await CommonAxios.get("/files/form/projects", { responseType: "blob" });

    handleDownloadBlob(
      new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "프로젝트_일괄_업로드_양식.xlsx"
    );
  };

  return (
    <Section>
      <Title order={2} fz={24} pl={20} mb={24}>
        일괄 등록
      </Title>
      <Stack>
        <Row field="일괄등록 양식" fieldSize={130}>
          <PrimaryButton onClick={handleDownload}>다운로드</PrimaryButton>
        </Row>
        <Row field="일괄등록" fieldSize={130}>
          <Group w={"50%"}>
            <FileInput
              placeholder={"썸네일 선택"}
              w={"50%"}
              multiple
              onChange={(files) => setThumbnailFiles(files)}
            />
            <FileInput
              placeholder={"포스터 선택"}
              w={"50%"}
              multiple
              onChange={(files) => setPosterFiles(files)}
            />
            <FileInput
              placeholder={"엑셀 파일 선택"}
              w={"50%"}
              onChange={(file) => setExcelFile(file)}
            />
            <PrimaryButton onClick={handleSubmit}>등록하기</PrimaryButton>
            {error && (
              <p style={{ color: "red", marginBlockStart: 0, marginBlockEnd: 0 }}>{error}</p>
            )}
          </Group>
        </Row>
      </Stack>
    </Section>
  );
}
