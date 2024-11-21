import { handleDownloadFile } from "./handleDownloadFile";

export function handleDownloadClick(id: number, name: string) {
  handleDownloadFile({ fileId: id, fileName: name });
}
