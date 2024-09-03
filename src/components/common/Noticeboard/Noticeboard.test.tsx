import { render, screen } from "@/utils/test-utils";
import { Noticeboard } from "./Noticeboard";
import "@testing-library/jest-dom";

describe("Noticeboard component", () => {
  it("renders correctly with the given heading, classifier, and items", () => {
    const classifier = {
      data: [
        { value: "0", label: "label 1" },
        { value: "1", label: "label 2" },
        { value: "2", label: "label 3" },
      ],
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
        contentTxt: "this is important!",
      },
      {
        title: "Content",
        number: 2,
        author: "admin",
        date: new Date(),
        view: 456,
        pinned: false,
        href: "/2",
        contentTxt: "this is a content.",
      },
    ];

    render(
      <Noticeboard
        inputValue=""
        handleInput={() => {}}
        handleKeyDown={() => {}}
        handleSelect={() => {}}
        handleSubmit={() => {}}
        heading="Board"
        classifier={classifier}
        items={items}
        paginShow={10}
        paginJustify="end"
        paginMarginTop="20px"
      />
    );
    expect(screen.getByRole("region", { name: "Noticeboard" })).toBeInTheDocument();
  });
});
