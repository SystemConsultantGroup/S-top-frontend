import classes from "./ProjectSelectTab.module.css";
import { ReactNode, useState } from "react";
import { Tabs, TabsList, TabsPanel, TabsProps, TabsTab } from "@mantine/core";

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
        <TabsList grow={grow} className={classes.tablist}>
          {tabs.map((tab, index) => (
            <TabsTab
              key={index}
              value={tab.id}
              className={`${classes.tab} ${activeTab === tab.id ? classes.activeTab : ""}`}
            >
              {tab.label}
            </TabsTab>
          ))}
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsPanel key={index} value={tab.id} className={classes.panel}>
            {tab.content}
          </TabsPanel>
        ))}
      </Tabs>
    </>
  );
}
