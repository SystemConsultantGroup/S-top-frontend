"use client";

import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import styles from "@/styles/UserBoard.module.css";
import { NoticeDetail } from "@/components/common/NoticeDetail";
import { useEffect, useState } from "react";
import { CommonAxios } from "@/utils/CommonAxios";
import { handleDownloadClick } from "@/utils/handleDownloadFile";

export default function NoticeDetailPage() {
  const HEADING = "공지사항";

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
    const fetchData = async () => {
      if (!ID) return;
      try {
        const response = await CommonAxios.get(`/notices/${ID}`);
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
  }, [ID, data, error]);

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
