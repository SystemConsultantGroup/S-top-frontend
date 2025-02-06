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
    if (!thumbnailFiles || !posterFiles || !excelFile) {
      setError("파일을 모두 선택해 주세요.");
      return;
    }
    setError(null);

    try {
      // 1) 먼저 썸네일, 포스터 파일을 /files로 업로드
      const thumbnailFormData = new FormData();
      thumbnailFiles.forEach((file) => {
        thumbnailFormData.append("files", file);
      });

      const posterFormData = new FormData();
      posterFiles.forEach((file) => {
        posterFormData.append("files", file);
      });

      const [thumbnailRes, posterRes] = await Promise.all([
        CommonAxios.post("/files", thumbnailFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        CommonAxios.post("/files", posterFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
      ]);

      // 2) 파일 업로드 API의 응답 데이터를 Blob 형태로 변환
      const thumbnailResBlob = new Blob([JSON.stringify(thumbnailRes.data)], {
        type: "application/json",
      });
      const posterResBlob = new Blob([JSON.stringify(posterRes.data)], {
        type: "application/json",
      });

      // 3) /projects/excel로 보낼 최종 FormData 생성
      const uploadFormData = new FormData();
      uploadFormData.append("thumbnails", thumbnailResBlob);
      uploadFormData.append("posters", posterResBlob);
      uploadFormData.append("excel", excelFile);

      // 4) 프로젝트 일괄등록 API 호출
      await CommonAxios.post("/projects/excel", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 성공 시 alert, 파일 선택 초기화
      alert("등록이 완료되었습니다.");
      setThumbnailFiles(null);
      setPosterFiles(null);
      setExcelFile(null);
    } catch (err) {
      setError("업로드 중 오류가 발생했습니다.");
    }
  };

  const handleDownload = async () => {
    try {
      const res = await CommonAxios.get("/files/form/projects", { responseType: "blob" });
      handleDownloadBlob(
        new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        "프로젝트_일괄_업로드_양식.xlsx"
      );
    } catch {
      setError("다운로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <Section>
      <Title order={2} fz={24} pl={20} mb={24}>
        일괄 등록
      </Title>

      <Stack>
        {/* 일괄등록 양식 다운로드 */}
        <Row field="일괄등록 양식" fieldSize={130}>
          <PrimaryButton onClick={handleDownload}>다운로드</PrimaryButton>
        </Row>

        {/* 파일 입력 폼 */}
        <Row field="일괄등록" fieldSize={130}>
          <Group w="50%">
            <FileInput
              placeholder="썸네일 선택"
              w="50%"
              multiple
              // Mantine's FileInput can be cleared by passing null or undefined
              value={thumbnailFiles || undefined}
              onChange={(files) => setThumbnailFiles(files)}
            />
            <FileInput
              placeholder="포스터 선택"
              w="50%"
              multiple
              value={posterFiles || undefined}
              onChange={(files) => setPosterFiles(files)}
            />
            <FileInput
              placeholder="엑셀 파일 선택"
              w="50%"
              value={excelFile || undefined}
              onChange={(file) => setExcelFile(file)}
            />

            <PrimaryButton onClick={handleSubmit}>등록하기</PrimaryButton>
          </Group>
        </Row>

        {/* 선택된 파일 목록 표시 */}
        <Row field="선택 파일 목록" fieldSize={130}>
          <div>
            {thumbnailFiles && thumbnailFiles.length > 0 && (
              <>
                <strong>썸네일 파일:</strong>
                <ul>
                  {thumbnailFiles.map((file) => (
                    <li key={file.name}>{file.name}</li>
                  ))}
                </ul>
              </>
            )}
            {posterFiles && posterFiles.length > 0 && (
              <>
                <strong>포스터 파일:</strong>
                <ul>
                  {posterFiles.map((file) => (
                    <li key={file.name}>{file.name}</li>
                  ))}
                </ul>
              </>
            )}
            {excelFile && (
              <>
                <strong>엑셀 파일:</strong> {excelFile.name}
              </>
            )}
          </div>
        </Row>

        {/* 에러 메시지 표시 */}
        {error && (
          <Row field="" fieldSize={130}>
            <p style={{ color: "red", marginBlockStart: 0, marginBlockEnd: 0 }}>{error}</p>
          </Row>
        )}
      </Stack>
    </Section>
  );
}
