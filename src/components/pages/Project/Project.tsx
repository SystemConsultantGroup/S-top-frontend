import { Header } from "@/components/common/Header";
import { ProjectSelectTab } from "@/components/common/Tabs";
import { TabType } from "@/components/common/Tabs/ProjectSelectTab/ProjectSelectTab";
import { useReducer } from "react";
import { ProjectTabAll } from "./elements/ProjectTabAll";
import { ProjectTabEvent } from "./elements/ProjectTabEvent";
import { filterReducer } from "./filterReducer";
import styles from "./Project.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { BannerList } from "./BannerList";

export function Project() {
  const PROJECT_BANNER_INFO = BannerList.find((item) => item.type === "PROJECT")!;

  const [filters, dispatch] = useReducer(filterReducer, []);
  const reducerProps = {
    filters,
    dispatch,
  };

  const projectTabs: TabType[] = [
    {
      id: "1",
      label: "S-TOP 이벤트 프로젝트",
      children: <ProjectTabEvent {...reducerProps} />,
    },
    {
      id: "2",
      label: "전체 프로젝트",
      children: <ProjectTabAll {...reducerProps} />,
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.banner}>
        <Banner {...PROJECT_BANNER_INFO} />
      </div>
      <div className={styles.container}>
        <ProjectSelectTab tabs={projectTabs} defaultTabId="1" />
      </div>
    </>
  );
}
