import classes from "./ProjectSelectTab.module.css";
import { ReactNode, useState } from "react";
import { Tabs, TabsProps } from "@mantine/core";

export interface TabType {
  id: string;
  label: string;
  content: ReactNode;
}

interface Props {
  tabs: TabType[];
  defaultTabId: string | null;
  grow?: boolean;
}

export function ProjectSelectTab({
  tabs,
  defaultTabId = null,
  grow = true,
  ...props
}: TabsProps & Props) {
  const [activeTab, setActiveTab] = useState<string | null>(defaultTabId);

  return (
    <>
      <Tabs value={activeTab} onChange={setActiveTab} className={classes.element} {...props}>
        <Tabs.List grow={grow} className={classes.tablist}>
          {tabs.map((tab, index) => (
            <Tabs.Tab
              key={index}
              value={tab.id}
              className={`${classes.tab} ${activeTab === tab.id ? classes.activeTab : ""}`}
            >
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map((tab, index) => (
          <Tabs.Panel key={index} value={tab.id} className={classes.panel}>
            {tab.content}
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
}
