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
        id: 1,
        title: "공지 사항 1",
        hitCount: 10,
        fixed: true,
        createdAt: "2024-10-29T22:38:56.662802",
        updatedAt: "2024-10-29T22:38:56.662804",
      },
      {
        id: 2,
        title: "공지 사항 2",
        hitCount: 10,
        fixed: false,
        createdAt: "2024-10-29T22:38:56.662818",
        updatedAt: "2024-10-29T22:38:56.662819",
      },
    ];

    render(
      <Noticeboard
        handleInput={() => {}}
        handleSelect={() => {}}
        heading="Board"
        classifier={classifier}
        items={items}
      />
    );
    expect(screen.getByRole("region", { name: "Noticeboard" })).toBeInTheDocument();
  });
});
