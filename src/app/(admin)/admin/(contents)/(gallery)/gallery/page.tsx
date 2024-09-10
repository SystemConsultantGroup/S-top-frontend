"use client";

import classes from "../galley.module.css";
import { SearchInput } from "@/components/common/SearchInput";
import { GalleryPreview } from "@/components/common/GalleryPreview/GalleryPreview";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { PrimaryButton } from "@/components/common/Buttons";
import { CommonAxios } from "@/utils/CommonAxios";

const testimgurl = "https://i.ytimg.com/vi/h7SkjDKF11g/maxresdefault.jpg";
export interface Props {
  imgUrl: string;
  title: string;
  date: Date;
  viewCount?: number;
}
// function useWindowSize() {
//   const [windowSize, setWindowSize] = useState({
//     width: 0,
//     height: 0,
//   });
//   useEffect(() => {
//     if (window) {
//       const handleResize = () => {
//         setWindowSize({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });
//       };

//       window.addEventListener("resize", handleResize);

//       handleResize();
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);
//   return windowSize;
// }
interface asdf {
  totalElements: any;
  totalPages: any;
  size: any;
  content: any;
}
const minWidth = 280;
export default function AdminGalleryPage() {
  const reshape: Props[][] = [];
  const windowWidth = 1500;
  // const windowWidth = useWindowSize().width;
  const col = Math.max(Math.floor((windowWidth - 400) / minWidth), 1);
  const width = Math.max((windowWidth - 400 - 20 * (col - 1)) / col, minWidth);
  const [Data, setData] = useState<asdf | null>(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await CommonAxios.get("/galleries?year=2024&month=4");
      setData(data);
    };
    getData();
  }, []);

  const datas: Props[] = Array(10).fill({
    imgUrl: testimgurl,
    title: "짱짱 멋진 제목",
    date: new Date(),
    viewCount: col,
  });
  while (datas.length) reshape.push(datas.splice(0, col));
  console.log(Data);
  return (
    <>
      <PageHeader title="갤러리 관리" />

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
              <SearchInput w={300}></SearchInput>
            </td>
            <td>
              <PrimaryButton>검색</PrimaryButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: "flex", padding: 10 }}>
        <PrimaryButton style={{ marginLeft: "auto" }}>사진 등록</PrimaryButton>
      </div>
      <table className={classes.cards}>
        <tbody>
          {reshape.map((e) => {
            return (
              <>
                <tr>
                  {e.map((f) => {
                    return (
                      <>
                        <td>
                          <GalleryPreview {...f} width={width} height={(width / 300) * 180} />
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
