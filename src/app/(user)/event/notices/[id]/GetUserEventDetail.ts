type DynamicSegmentType = string | null;

export function getUserEventDetail(id: DynamicSegmentType) {
  console.log(id);
  const item = {
    title: "Title",
    author: "admin",
    created_date: new Date(),
    edited_date: new Date(),
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
    children: "Content",
  };
  return item;
}
