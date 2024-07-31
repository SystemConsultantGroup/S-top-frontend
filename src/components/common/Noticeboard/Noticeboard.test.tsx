import { render, screen } from "@/utils/test-utils";
import { Noticeboard } from "./Noticeboard";
import "@testing-library/jest-dom";

describe("Noticeboard component", () => {
  it("renders correctly with the given heading, classifier, and items", () => {
    const classifier = {
      labels: ["Label 1", "Label 2", "Label 3"],
      defaultLabel: 0,
      searchPlaceholder: "Input here to search...",
    };
    const items = [
      {
        title: "Important",
        number: 1,
        author: "admin",
        date: new Date(),
        view: 123,
        pinned: true,
        href: "/1",
      },
      {
        title: "Content",
        number: 2,
        author: "admin",
        date: new Date(),
        view: 456,
        pinned: false,
        href: "/2",
      },
    ];

    render(<Noticeboard heading="Board" classifier={classifier} items={items} />);
    expect(screen.getByRole("region", { name: "Noticeboard" })).toBeInTheDocument();
  });
});
