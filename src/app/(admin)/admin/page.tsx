import { AdminNoticePreview } from "@/components/common/AdminNoticePreview/AdminNoticePreview";
import { Statics, values } from "@/components/common/Statics/Statics";
import { PageHeader } from "@/components/common/PageHeader";
import classes from "./layout.module.css";

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
const array: values[] = Array(0);
for (let i = 0; i < 9; i++) {
  array.push({
    value: Math.random() * 100 + 100,
    plotvalue: undefined,
    label: Math.round(Math.random() * 100 + 100).toString(),
  });
}

function Sinchung() {
  return (
    <>
      <section style={{ width: "auto" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <td>ID</td>
              <td>신청자</td>
              <td>신청일</td>
              <td>분류</td>
              <td>비고</td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: "1px solid white" }}></tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
        <div style={{ width: "auto" }}>
          <div> </div>
          <div> </div>
        </div>
      </section>
    </>
  );
}
function TodaysVisitor() {
  return (
    <>
      <table style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
        <tbody>
          <tr>
            <td>총 접속자</td>
            <td>1명</td>
          </tr>
          <tr>
            <td>오늘 접속자</td>
            <td>2명</td>
          </tr>
          <tr>
            <td>일평균 접속자</td>
            <td>3명</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function AdminMainPage() {
  return (
    <>
      <PageHeader title="관리자 메인" />
      <section className={classes.container}>
        <Sinchung></Sinchung>
        <AdminNoticePreview title={""} pagingData={testdata}></AdminNoticePreview>
        <TodaysVisitor></TodaysVisitor>
        <Statics values={array} title="접속 통계"></Statics>
      </section>
    </>
  );
}
