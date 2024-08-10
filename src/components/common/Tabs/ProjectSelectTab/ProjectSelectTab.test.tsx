import { render, screen } from "@/utils/test-utils";
import { ProjectSelectTab, TabType } from "./ProjectSelectTab";
import "@testing-library/jest-dom";

describe("Project Select Tab component", () => {
  it("renders the correct default tab", () => {
    const tabs: TabType[] = [
      { id: "1", label: "Tab 1", content: "Tab 1 content" },
      { id: "2", label: "Tab 2", content: "Tab 2 content" },
    ];
    render(<ProjectSelectTab tabs={tabs} defaultTabId={"2"} />);

    expect(screen.getByText("Tab 2 content")).toBeInTheDocument();
  });

  it("renders all the tab labels provided", () => {
    const tabs = [
      { id: "1", label: "Tab 1", content: "Tab 1 content" },
      { id: "2", label: "Tab 2", content: "Tab 2 content" },
      { id: "3", label: "Tab 3", content: "Tab 3 content" },
    ];
    render(<ProjectSelectTab tabs={tabs} defaultTabId={"1"} />);

    tabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });
});
