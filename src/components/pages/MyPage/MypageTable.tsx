import classes from "./MypageTable.module.css";
import { Text, Table, TableThead, TableTbody, TableTh, TableTr, TableTd } from "@mantine/core";

export function MypageTable() {
  const data = [
    {
      date: "2024.01.01",
      title: "산학협력 과제를 제안합니다.산학협력 과제를 제안합니다.산학협력 과제를 제안합니다.",
      status: "-",
    },
    { date: "2024.01.01", title: "산학협력 과제를 제안합니다.", status: "완료" },
    { date: "2024.01.01", title: "산학협력 과제를 제안합니다.", status: "완료" },
  ];

  const data2 = [
    {
      date: "2024.01.01",
      title: "프로젝트 문의입니다.",
      status: "-",
    },
    { date: "2024.01.01", title: "프로젝트 문의입니다.", status: "완료" },
    { date: "2024.01.01", title: "프로젝트 문의입니다.", status: "완료" },
  ];

  return (
    <>
      <Text className={classes.title}>나의 과제 제안</Text>
      <div className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableThead className={classes.header}>
            <TableTr>
              <TableTh className={classes.th}>등록일</TableTh>
              <TableTh className={classes.th}>제목</TableTh>
              <TableTh className={classes.th}>답변</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {data.map((item, index) => (
              <TableTr key={index}>
                <TableTd>{item.date}</TableTd>
                <TableTd className={classes.postTitle}>{item.title}</TableTd>
                <TableTd>{item.status}</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </div>
      <Text className={classes.title}>나의 프로젝트 문의</Text>
      <div className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableThead className={classes.header}>
            <TableTr>
              <TableTh className={classes.th}>등록일</TableTh>
              <TableTh className={classes.th}>제목</TableTh>
              <TableTh className={classes.th}>답변</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {data2.map((item, index) => (
              <TableTr key={index}>
                <TableTd>{item.date}</TableTd>
                <TableTd className={classes.postTitle}>{item.title}</TableTd>
                <TableTd>{item.status}</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </div>
    </>
  );
}
