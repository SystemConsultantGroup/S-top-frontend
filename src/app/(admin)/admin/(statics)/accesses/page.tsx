import { Statics } from "@/components/common/Statics/Statics";
import { Text } from "@mantine/core";
const array: number[] = Array(0);
const array2: number[] = Array(0);
const array3: string[] = Array(0);
for (let i = 0; i < 9; i++) {
  array.push(Math.random() * 100 + 100);
  array3.push(Math.round(Math.random() * 100 + 100).toString());
}
for (let i = 0; i < 7; i++) {
  array2.push(Math.random() * 100 + 100);
}
export default function AdminAccessesStatics() {
  return (
    <>
      <div>
        <h1>접속 통계</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <Statics values={array} plotvalues={array2} labels={array3}></Statics>
        <Text>월별 통계</Text>

        <Statics values={array} labels={array3}></Statics>
        <Text>년도별 통계</Text>
      </div>
    </>
  );
}
