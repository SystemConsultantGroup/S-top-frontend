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

interface sinchung {
  name: string;
  date: string;
  type: string;
  etc?: string;
}
function Sinchung({ data }: { data?: sinchung[] }) {
  return (
    <>
      <section style={{ width: "auto" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <td style={{ alignItems: "center" }}>ID</td>
              <td style={{ alignItems: "center" }}>신청자</td>
              <td style={{ alignItems: "center" }}>신청일</td>
              <td style={{ alignItems: "center" }}>분류</td>
              <td style={{ alignItems: "center" }}>비고</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ borderTop: "2px solid white" }} colSpan={5}></td>
            </tr>
            {data?.map((e, i) => {
              return (
                <>
                  <tr>
                    <td style={{ alignItems: "center" }}>{i}</td>
                    <td style={{ alignItems: "center" }}>{e.name}</td>
                    <td style={{ alignItems: "center" }}>{e.date}</td>
                    <td style={{ alignItems: "center" }}>{e.type}</td>
                    <td style={{ alignItems: "center" }}>{e.etc}</td>
                  </tr>
                </>
              );
            })}
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
function TodaysVisitor({
  total,
  today,
  dailyAvg,
}: {
  total?: number;
  today?: number;
  dailyAvg?: number;
}) {
  return (
    <>
      <section>
        <table
          style={{
            textAlign: "center",
            alignContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            borderTop: "3px solid white",
            borderBottom: "3px solid white",
          }}
        >
          <tbody>
            <tr>
              <td style={{ width: "50%", padding: 20, alignItems: "center" }}>총 접속자</td>
              <td style={{ width: "50%", padding: 20, alignItems: "center" }}>{total}명</td>
            </tr>
            <tr>
              <td style={{ borderBlock: "1px dashed white", padding: 20, alignItems: "center" }}>
                오늘 접속자
              </td>
              <td style={{ borderBlock: "1px dashed white", padding: 20, alignItems: "center" }}>
                {today}명
              </td>
            </tr>
            <tr>
              <td style={{ padding: 20, alignItems: "center" }}>일평균 접속자</td>
              <td style={{ padding: 20, alignItems: "center" }}>{dailyAvg}명</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

export default function AdminMainPage() {
  return (
    <>
      <PageHeader title="관리자 메인" />
      <table className={classes.container}>
        <tbody>
          <tr>
            <td style={{ width: "40%" }} valign="top">
              <Sinchung></Sinchung>
            </td>
            <td style={{ width: "60%" }} align="center">
              <AdminNoticePreview title={""} pagingData={testdata}></AdminNoticePreview>
            </td>
          </tr>
          <tr>
            <td>
              <h2>가입 신청 목록</h2>
            </td>
            <td>
              <h2>공지사항 게시판</h2>
            </td>
          </tr>
          <tr>
            <td>
              <TodaysVisitor today={123} total={456} dailyAvg={79}></TodaysVisitor>
            </td>
            <td>
              <Statics values={array} title=""></Statics>
            </td>
          </tr>
          <tr>
            <td>
              <h2>방문자수</h2>
            </td>
            <td>
              <h2>접속 통계</h2>
            </td>
          </tr>
        </tbody>
      </table>
      <section></section>
    </>
  );
}
