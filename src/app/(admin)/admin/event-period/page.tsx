"use client";
import { PrimaryButton } from "@/components/common/Buttons";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { PageHeader } from "@/components/common/PageHeader";

export default function AdminEventPeriodPage() {
  return (
    <>
      <PageHeader title="이벤트 기간 설정" />
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
          <h2 style={{ paddingTop: 30 }}>현재 이벤트 기간 </h2>
          <h3>{"2024.02.03. 09:00 부터 2024.02.10. 12:00 까지"} </h3>
          <div style={{ padding: 40 }}></div>
          <div style={{ paddingTop: 20 }}>
            <h2 style={{}}>이벤트 시작 일시</h2>
            <Dropdown
              options={["1", "2", "3"]}
              placeholder={"선택하세요"}
              onOptionClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></Dropdown>
            <Dropdown
              options={["1", "2", "3"]}
              placeholder={"선택하세요"}
              onOptionClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></Dropdown>
          </div>
          <div style={{ paddingTop: 20 }}>
            <h2 style={{}}>이벤트 종료 일시 </h2>
            <Dropdown
              options={["1", "2", "3"]}
              placeholder={"선택하세요"}
              onOptionClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></Dropdown>
            <Dropdown
              options={["1", "2", "3"]}
              placeholder={"선택하세요"}
              onOptionClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></Dropdown>
          </div>
          <div style={{ paddingTop: 20, paddingBottom: 30 }}>
            <PrimaryButton label="변경하기"></PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
