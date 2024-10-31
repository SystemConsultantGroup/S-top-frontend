"use client";

import classes from "../jobfair.module.css";
import { SearchInput } from "@/components/common/SearchInput";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { VideoCard } from "@/components/common/VideoCard/VideoCard";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { PrimaryButton } from "@/components/common/Buttons";

const testurl = "https://www.youtube.com/embed/h7SkjDKF11g";
export interface Props {
  imgUrl: string;
  title: string;
  date: Date;
  viewCount?: number;
}
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (window) {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}
const minWidth = 280;
export default function AdminJobFairPage() {
  const reshape: Props[][] = [];
  const windowWidth = useWindowSize().width;
  const col = Math.max(Math.floor((windowWidth - 400) / minWidth), 1);
  const width = Math.max((windowWidth - 400 - 20 * (col - 1)) / col, minWidth);
  const datas: Props[] = Array(10).fill({
    imgUrl: testurl,
    title: "짱짱 멋진 제목",
    date: new Date(),
    viewCount: col,
  });
  while (datas.length) reshape.push(datas.splice(0, col));
  return (
    <>
      <PageHeader title="잡페어 영상 관리" />

      <table className={classes.search}>
        <tbody>
          <tr>
            <td>
              <Dropdown
                options={["1", "2"]}
                placeholder={"연도 선택"}
                onOptionClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              ></Dropdown>
            </td>
            <td>
              <Dropdown
                options={["1", "2"]}
                placeholder={"분류 선택"}
                onOptionClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              ></Dropdown>
            </td>
            <td>
              <SearchInput w={300}></SearchInput>
            </td>
            <td>
              <PrimaryButton>검색</PrimaryButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: "flex", padding: 10 }}>
        <PrimaryButton style={{ marginLeft: "auto" }}>잡페어 영상 등록</PrimaryButton>
      </div>
      <table className={classes.cards}>
        <tbody>
          {reshape.map((e) => {
            return (
              <>
                <tr>
                  {e.map((f, i) => {
                    return (
                      <>
                        <td width={width}>
                          <VideoCard title={f.title} subtitle={i.toString()} videoUrl={testurl} />
                        </td>
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
