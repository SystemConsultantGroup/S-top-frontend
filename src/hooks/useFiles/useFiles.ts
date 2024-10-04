import { ApiFile } from "@/types/file";
import { CommonAxios } from "@/utils/CommonAxios";
import { getUniqueId } from "@/utils/getUniqueId";
import { useState } from "react";

/**
 * 파일 첨부를 위한 커스텀 훅
 */
export function useFiles() {
  // 파일 목록 state
  const [files, setFiles] = useState<{ id: string; file: File | null }[]>([]);

  // 파일 추가 함수, 첨부 파일 추가 버튼 등에서 호출
  const handleAddFile = () => {
    setFiles([...files, { id: getUniqueId(), file: null }]);
    console.log(files);
  };

  // 파일 삭제 함수, 파일 삭제 버튼 등에서 호출
  const handleRemoveFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  // 파일 변경 함수, FileInput 컴포넌트에서 호출
  const handleFileChange = (id: string) => (file: File | null) => {
    setFiles(files.map((f) => (f.id === id ? { ...f, file } : f)));
  };

  // 임시 파일 객체 생성 함수 (file의 blob 부분은 비어있는 배열로 초기화)
  const getTempFile = (prev: ApiFile): File => {
    return new File([], prev.name, {
      type: prev.mimeType,
    });
  };

  /**
   * 파일 업로드 함수, 백엔드 [POST] /files API 호출
   */
  const uploadFiles = async (files: { id: string; file: File | null }[]) => {
    const fileIds: string[] = [];
    const filesToUpload: FormData = new FormData();

    for (const { file, id } of files) {
      if (file) {
        // temp file의 경우에 id만 추가
        if (file.size == 0) {
          fileIds.push(id);
          continue;
        }

        filesToUpload.append("files", file);
      }
    }

    try {
      const response = await CommonAxios.post("/files", filesToUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      response.data.forEach((file: ApiFile) => {
        fileIds.push(String(file.id));
      });
    } catch (error) {
      console.error(`파일 업로드에 실패했습니다.`, error);
    }

    return fileIds;
  };

  return {
    files,
    setFiles,
    handleAddFile,
    handleRemoveFile,
    handleFileChange,
    getTempFile,
    uploadFiles,
  };
}
