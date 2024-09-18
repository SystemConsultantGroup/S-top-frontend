"use client";
import { PrimaryButton } from "@/components/common/Buttons";
import { PageHeader } from "@/components/common/PageHeader";
import { TextInput } from "@/components/common/TextInput";
import { YearPickerInput } from "@mantine/dates";
import { CommonAxios } from "@/utils/CommonAxios";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
export default function AdminGalleryCreate() {
  const [Data, setData] = useState<any | null>(null);
  const [Title, setTitle] = useState("");
  const [Year, setYear] = useState<Date | null>(null);
  const [Count, setCount] = useState(1);
  useEffect(() => {
    const getData = async () => {
      const { data } = await CommonAxios.get("/galleries?year=2024&month=4");
      setData(data);
    };
    getData();
  }, []);
  console.log(Data);
  console.log(Title);
  console.log(Year);

  return (
    <>
      <PageHeader title="갤러리 사진 등록" />

      <div
      // style={{
      //   width: "100%",
      //   height: "auto",
      //   position: "relative",
      //   background: "gray",
      //   borderRadius: 12,
      // }}
      >
        <form action={""}>
          <div style={{ paddingLeft: 30 }}>
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingRight: 10 }}>
                    <h3>제목</h3>
                  </td>
                  <td>
                    <TextInput
                      onChange={(event) => {
                        setTitle(event.currentTarget.value);
                      }}
                    ></TextInput>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: 10 }}>
                    <h3>연도</h3>
                  </td>
                  <td>
                    <YearPickerInput value={Year} onChange={setYear}></YearPickerInput>
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
                </tr>
                {Array(Count)
                  .fill(0)
                  .map((e, i) => {
                    return (
                      <>
                        <tr>
                          <td style={{ paddingRight: 10 }}>
                            <h3>사진 {i + 2}</h3>
                          </td>
                          <td>
                            <input type="file"></input>
                          </td>
                          <td>
                            <Button
                              variant="filled"
                              color="red"
                              onClick={() => {
                                setCount((e) => e - 1);
                              }}
                            >
                              <IconTrash size={14} />
                            </Button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                <tr>
                  <td style={{ paddingRight: 10 }}>
                    <h4>추가 사진</h4>
                  </td>
                  <td>
                    <PrimaryButton
                      onClick={() => {
                        setCount((e) => e + 1);
                      }}
                    >
                      항목 추가{Count}
                    </PrimaryButton>
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
                    <PrimaryButton>갤러리 등록하기</PrimaryButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}
