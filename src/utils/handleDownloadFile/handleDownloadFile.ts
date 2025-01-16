import { CommonAxios } from "../CommonAxios";

type TArg = {
  fileId: number;
  fileName: string;
};

// 파일의 ID와 파일명이 있을 때 다운로드 하는 함수
export async function handleDownloadFile({ fileId, fileName }: TArg) {
  const url = await getFileUrlById(fileId);
  const a = document.createElement("a");

  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}

// 파일의 ID가 있을 때 파일의 URL을 가져오는 함수 (next Image src 등에서 사용)
export async function getFileUrlById(fileId: number) {
  const result = await CommonAxios({
    url: `/files/${fileId}`,
    responseType: "blob",
  });

  const blob = new Blob([result.data]);

  const url = URL.createObjectURL(blob);

  return url;
}

export async function handleDownloadBlob(obj: Blob, fileName: string) {
  const url = window.URL.createObjectURL(obj);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
