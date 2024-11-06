import { PrimaryButton } from "@/components/common/Buttons";
import { PageHeader } from "@/components/common/PageHeader";
import { TextInput } from "@/components/common/TextInput";
export default function AdminJobFairCreate() {
  return (
    <>
      <PageHeader title="잡페어 영상 등록" />
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
          <table>
            <tbody>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>제목</h3>
                </td>
                <td colSpan={3}>
                  <TextInput></TextInput>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>연도</h3>
                </td>
                <td colSpan={3}>
                  <TextInput></TextInput>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>영상 유형</h3>
                </td>
                <td colSpan={3}>
                  <TextInput></TextInput>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>대담자</h3>
                </td>
                <td>
                  <TextInput></TextInput>
                </td>
                <td style={{ paddingInline: 10 }}>
                  <h3>대담자 소속</h3>
                </td>
                <td>
                  <TextInput></TextInput>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }}>
                  <h3>유튜브 링크</h3>
                </td>
                <td colSpan={3}>
                  <TextInput></TextInput>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: 10 }} colSpan={3}></td>
                <td>
                  <PrimaryButton>영상 등록하기</PrimaryButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
