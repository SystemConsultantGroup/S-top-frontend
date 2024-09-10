"use client";
import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { PageHeader } from "@/components/common/PageHeader";
import { TextInput } from "@/components/common/TextInput";
import { CommonAxios } from "@/utils/CommonAxios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const testimgurl = "https://i.ytimg.com/vi/h7SkjDKF11g/maxresdefault.jpg";

export default function AdminGalleryEdit() {
  const router = useRouter();
  const [Data, setData] = useState<any | null>(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await CommonAxios.get("/galleries/" + router.query.id);
      setData(data);
    };
    getData();
  }, []);
  console.log(Data);
  return (
    <>
      <PageHeader title="갤러리 사진 수정" />

      <div
      // style={{
      //   width: "100%",
      //   height: "auto",
      //   position: "relative",
      //   background: "gray",
      //   borderRadius: 12,
      // }}
      >
        <div style={{ paddingLeft: 30 }}>
          <Image
            src={testimgurl}
            alt="gallery preview image"
            width={0}
            height={0}
            sizes="30vw"
            style={{ width: "auto", height: "100%" }}
          />
          <table>
            <tbody>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>제목</h3>
                </td>
                <td>
                  <TextInput></TextInput>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>연도</h3>
                </td>
                <td>
                  <TextInput></TextInput>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>사진 추가</h3>
                </td>
              </tr>

              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>사진 1</h3>
                </td>
                <td>
                  <input type="file"></input>
                </td>
                <td>
                  <DangerButton>삭제</DangerButton>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>사진 2</h3>
                </td>
                <td>
                  <input type="file"></input>
                </td>
                <td>
                  <DangerButton>삭제</DangerButton>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBlock: 20 }}></td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h4>1번 사진이 썸네일로 지정됩니다.</h4>
                </td>
                <td>
                  <PrimaryButton>갤러리 수정하기</PrimaryButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
