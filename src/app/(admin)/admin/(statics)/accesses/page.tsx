import { PageHeader } from "@/components/common/PageHeader";
import { Statics, values } from "@/components/common/Statics/Statics";
const array: values[] = Array(0);

for (let i = 0; i < 20; i++) {
  array.push({
    value: Math.random() * 100 + 100,
    plotvalue: i < 7 ? Math.random() * 100 + 100 : undefined,
    label: Math.round(Math.random() * 100 + 100).toString(),
  });
}
export default function AdminAccessesStatics() {
  return (
    <>
      <PageHeader title="접속 통계" />
      <Statics values={array} title="월별 통계"></Statics>
      <Statics values={array} title="년도별 통계"></Statics>
    </>
  );
}
