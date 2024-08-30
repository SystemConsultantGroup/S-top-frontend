import { Banner } from "@/components/common/Banner/Banner";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { ProjectSelectTab } from "@/components/common/Tabs";
import { TabType } from "@/components/common/Tabs/ProjectSelectTab/ProjectSelectTab";
import { useReducer } from "react";
import { ProjectTab } from "./elements/ProjectTab";
import styles from "./Project.module.css";
import { bannerList } from "./utils/BannerList";
import { filterReducer } from "./utils/filterReducer";
import { projectEventProps, projectAllProps } from "./utils/getProjectList";

export function Project() {
  const PROJECT_BANNER_INFO = bannerList.find((item) => item.type === "PROJECT")!;

  const [filters, dispatch] = useReducer(filterReducer, []);
  const reducerProps = {
    filters,
    dispatch,
  };

  const projectTabs: TabType[] = [
    {
      id: "1",
      label: "S-TOP 이벤트 프로젝트",
      children: <ProjectTab {...reducerProps} data={projectEventProps} />,
    },
    {
      id: "2",
      label: "전체 프로젝트",
      children: <ProjectTab {...reducerProps} data={projectAllProps} />,
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
      <Footer />
    </>
  );
}
