import { render, screen } from "@/utils/test-utils";
import { NoticeDetail } from "./NoticeDetail";
import "@testing-library/jest-dom";

describe("Noticeboard Detail component", () => {
  it("renders correctly with the given props", () => {
    const props = {
      heading: "Board",
      title: "Title",
      author: "admin",
      created_date: new Date(),
      edited_date: undefined,
      attachment: [
        {
          name: "File 1",
          url: "/#",
        },
        {
          name: "File 2",
          url: "/#",
        },
      ],
      pinned: true,
      prev_page: undefined,
      next_page: {
        title: "Next",
        url: "/2",
      },
      children: <p>Content</p>,
    };

    render(<NoticeDetail {...props} />);
    expect(screen.getByRole("region", { name: "Noticeboard Detail" })).toBeInTheDocument();
  });
});
