import { CommonAxios } from "@/utils/CommonAxios";
import classes from "./MypageTable.module.css";
import { Text, Table, TableThead, TableTbody, TableTh, TableTr, TableTd } from "@mantine/core";
import { IUserInquiry, IUserProposal } from "@/types/user";
import { useState } from "react";

export function MypageTable() {
  const [proposals, setProposals] = useState<IUserProposal[]>([]);
  const [inquiries, setInquiries] = useState<IUserInquiry[]>([]);

  /**
   * 유저 과제 제안 리스트 조회
   */
  const fetchProposals = async () => {
    try {
      const response = await CommonAxios.get("/users/proposals");
      setProposals(response.data);
    } catch (error) {
      console.error("Failed to fetch user's proposals");
    } finally {
    }
  };

  /**
   * 유저 문의 리스트 조회
   */
  const fetchInquiries = async () => {
    try {
      const response = await CommonAxios.get("/users/inquiries");
      setInquiries(response.data);
    } catch (error) {
      console.error("Failed to fetch user's inquiries");
    } finally {
    }
  };

  /**
   * 날짜 형식 (YYYY.MM.DD)
   */
  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);

    const formattedDate = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${dateObj.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

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
            {/* TODO: 과제 제안 상세 페이지로 이동 */}
            {proposals.map((item, index) => (
              <TableTr key={index}>
                <TableTd>{formatDate(item.createdDate)}</TableTd>
                <TableTd className={classes.postTitle}>{item.title}</TableTd>
                <TableTd>{item.hasReply ? "완료" : "-"}</TableTd>
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
            {/* TODO: 프로젝트 문의 상세 페이지로 이동 */}
            {inquiries.map((item, index) => (
              <TableTr key={index}>
                <TableTd>{formatDate(item.createdDate)}</TableTd>
                <TableTd className={classes.postTitle}>{item.title}</TableTd>
                <TableTd>{item.hasReply ? "완료" : "-"}</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </div>
    </>
  );
}
