"use client";
import classes from "../galley.module.css";
import { SearchInput } from "@/components/common/SearchInput";
import { GalleryPreview } from "@/components/common/GalleryPreview/GalleryPreview";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";

const testimgurl = "https://i.ytimg.com/vi/h7SkjDKF11g/maxresdefault.jpg";
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
export default function AdminGalleryPage() {
  const reshape: Props[][] = [];
  const windowWidth = useWindowSize().width;
  const col = Math.max(Math.floor((windowWidth - 400) / minWidth), 1);
  const width = Math.max((windowWidth - 400 - 20 * (col - 1)) / col, minWidth);
  const datas: Props[] = Array(10).fill({
    imgUrl: testimgurl,
    title: "짱짱 멋진 제목",
    date: new Date(),
    viewCount: col,
  });
  while (datas.length) reshape.push(datas.splice(0, col));
  return (
    <>
      <PageHeader title="갤러리 관리" />

      <div className={classes.search}>
        <SearchInput></SearchInput>
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
