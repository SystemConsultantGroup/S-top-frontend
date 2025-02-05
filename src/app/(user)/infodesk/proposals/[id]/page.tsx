"use client";

import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import styles from "@/styles/UserBoard.module.css";
import { NoticeDetail } from "@/components/common/NoticeDetail";
import { useEffect, useState } from "react";
import { CommonAxios } from "@/utils/CommonAxios";
import { handleDownloadClick } from "@/utils/handleDownloadFile";

export default function InquiriesDetailPage() {
  const HEADING = "프로젝트 문의";

  const [ID, setID] = useState<string>();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fullPath = window.location.pathname;
    const id = fullPath.substring(fullPath.lastIndexOf("/") + 1);
    setID(id);
  }, []);

  useEffect(() => {
    if (!ID) return;

    const fetchData = async () => {
      setLoading(true); // 요청 시작 시 로딩 상태 변경
      try {
        const response = await CommonAxios.get(`/proposals/${ID}`);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다."));
      } finally {
        setLoading(false);
      }
    };
    if (!data && !error) {
      fetchData();
    }
  }, [ID]);

  return (
    <>
      <SubHeadNavbar title="Info Desk" />
      <div className={styles.container}>
        {loading ? (
          <p>내용을 불러오는 중</p>
        ) : (
          data && (
            <NoticeDetail heading={HEADING} item={data} handleDownloadClick={handleDownloadClick} />
          )
        )}
      </div>
    </>
  );
}
