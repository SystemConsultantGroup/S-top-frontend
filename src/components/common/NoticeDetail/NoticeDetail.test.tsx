import { render, screen } from "@/utils/test-utils";
import { NoticeDetail } from "./NoticeDetail";
import "@testing-library/jest-dom";
import { handleDownloadFile } from "@/utils/handleDownloadFile";

describe("Noticeboard Detail component", () => {
  it("renders correctly with the given props", () => {
    const props = {
      heading: "Board",
      item: {
        id: 1,
        title: "공지 사항 제목",
        content: "content",
        hitCount: 10,
        fixed: true,
        createdAt: "2024-10-29T22:38:56.694639",
        updatedAt: "2024-10-29T22:38:56.69464",
        files: [
          {
            id: 1,
            uuid: "014eb8a0-d4a6-11ee-adac-117d766aca1d",
            name: "예시 첨부 파일 1.jpg",
            mimeType: "image/jpeg",
            createdAt: "2024-10-29T22:38:56.69463",
            updatedAt: "2024-10-29T22:38:56.694634",
          },
          {
            id: 2,
            uuid: "11a480c0-13fa-11ef-9047-570191b390ea",
            name: "예시 첨부 파일 2.jpg",
            mimeType: "image/jpeg",
            createdAt: "2024-10-29T22:38:56.694635",
            updatedAt: "2024-10-29T22:38:56.694636",
          },
          {
            id: 3,
            uuid: "1883fc70-cfb4-11ee-a387-e754bd392d45",
            name: "예시 첨부 파일 3.jpg",
            mimeType: "image/jpeg",
            createdAt: "2024-10-29T22:38:56.694637",
            updatedAt: "2024-10-29T22:38:56.694638",
          },
        ],
      },
      nav: {
        next_page: {
          title: "이건 다음 글입니다.",
          url: "/infodesk/notices/2",
        },
      },
      handleDownloadClick,
    };

    render(<NoticeDetail {...props} />);
    expect(screen.getByRole("region", { name: "Noticeboard Detail" })).toBeInTheDocument();
  });
});

function handleDownloadClick(id: number, name: string) {
  handleDownloadFile({ fileId: id, fileName: name });
}
