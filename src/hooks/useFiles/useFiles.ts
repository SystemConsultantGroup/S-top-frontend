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
   * 파일 업로드에 실패할 경우 재시도
   */
  const uploadFiles = async (files: { id: string; file: File | null }[]) => {
    const fileIds = [];
    for (const { file } of files) {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        // 작업의 원자성을 위해 while 루프를 사용
        let success = false;
        while (!success) {
          try {
            const response = await CommonAxios.post("/files", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            fileIds.push(response.data.id); // 서버에서 반환된 파일 ID
            success = true;
          } catch (error) {
            console.error(`파일 업로드에 실패했습니다: ${file.name}. 재시도합니다.`, error);
          }
        }
      }
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
