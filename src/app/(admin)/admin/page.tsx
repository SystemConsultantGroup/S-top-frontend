import { AdminNoticePreview } from "@/components/common/AdminNoticePreview/AdminNoticePreview";
import { Statics } from "@/components/common/Statics/Statics";

const testdata = [
  {
    data: [
      {
        pinned: true,
        title: "S-TOP 리뉴얼 안내",
        writer: "SCG",
        registeredDate: new Date(),
      },
      {
        pinned: true,
        title: "S-TOP 리뉴얼 안내 재공지",
        writer: "SCG",
        registeredDate: new Date(),
      },
      {
        pinned: true,
        title: "S-TOP 리뉴얼 안내 22",
        writer: "SCG",
        registeredDate: new Date(),
      },
      {
        pinned: false,
        title: "공지사항 제목입니다. 엄청 긴 제목입니다. 더 긴 제목",
        writer: "행정실",
        registeredDate: new Date(),
      },
      {
        pinned: false,
        title: "공지사항 제목입니다.",
        writer: "소프트웨어융합대학 행정실",
        registeredDate: new Date(),
      },
    ],
  },
  {
    data: [
      {
        pinned: false,
        title: "공지사항 제목입니다.",
        writer: "행정실",
        registeredDate: new Date(),
      },
      {
        pinned: false,
        title: "공지사항 제목입니다. 2",
        writer: "소프트웨어융합대학 행정실",
        registeredDate: new Date(),
      },
    ],
  },
];
const array: number[] = Array(0);
const array2: string[] = Array(0);
for (let i = 0; i < 9; i++) {
  array.push(Math.random() * 100 + 100);
  array2.push(Math.round(Math.random() * 100 + 100).toString());
}
const testdata2 = {
  values: array,
  labels: array2,
};

export default function AdminMainPage() {
  return (
    <>
      <div>
        <h1>관리자 메인</h1>
      </div>
      <div>
        <AdminNoticePreview title={""} pagingData={testdata}></AdminNoticePreview>
      </div>
      <div>
        <Statics {...testdata2}></Statics>
      </div>
    </>
  );
}
