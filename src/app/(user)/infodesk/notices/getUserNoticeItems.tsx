import { INoticeAllItem } from "@/types/PageBoardTypes";
import { ReadonlyURLSearchParams } from "next/navigation";

export function getUserNoticeItems(params: ReadonlyURLSearchParams) {
  const queryParams = params.get("query");
  const categoryIdParams = params.get("categoryId");

  const items = [
    {
      title: "Important Notice",
      number: 1,
      author: "admin",
      date: new Date(),
      view: 123,
      pinned: true,
      href: "#",
      contentTxt: "안녕하세요 이건 아주 중요한 공지입니다. 꼭 확인해주세요.",
    },
    {
      title: "Content Update",
      number: 2,
      author: "admin",
      date: new Date(),
      view: 456,
      pinned: false,
      href: "#",
      contentTxt: "우리 동아리는 SCG. 중요한 업데이트가 있습니다.",
    },
    {
      title: "Reminder",
      number: 3,
      author: "admin",
      date: new Date(),
      view: 789,
      pinned: false,
      href: "#",
      contentTxt: "이 공지사항을 꼭 확인해 주세요.",
    },
    {
      title: "Important Announcement",
      number: 4,
      author: "admin",
      date: new Date(),
      view: 321,
      pinned: true,
      href: "#",
      contentTxt: "중요한 발표가 있습니다. 확인해 주세요.",
    },
  ];

  const filteredItems = filterItems({ items, queryParams, categoryIdParams });
  const sortedItems = arrangeItems(filteredItems);
  return sortedItems;
}

interface IFilterItems {
  items: INoticeAllItem[];
  queryParams: string | null;
  categoryIdParams: string | null;
}

function filterItems({ items, queryParams, categoryIdParams }: IFilterItems) {
  if (!queryParams || !categoryIdParams) {
    return items;
  }
  const categoryId = Number(categoryIdParams);

  return items.filter((item) => {
    const titleLower = item.title.toLowerCase();
    const contentLower = item.contentTxt.toLowerCase();
    const queryLower = queryParams.toLowerCase();
    switch (categoryId) {
      case 0:
        return titleLower.includes(queryLower) || contentLower.includes(queryLower);
      case 1:
        return titleLower.includes(queryLower);
      case 2:
        return contentLower.includes(queryLower);
      default:
        return false;
    }
  });
}

function arrangeItems(items: INoticeAllItem[]) {
  const pinnedItems = items.filter((item) => item.pinned);
  const unpinnedItems = items.filter((item) => !item.pinned);

  pinnedItems.sort((a, b) => +b.date - +a.date);
  unpinnedItems.sort((a, b) => +b.date - +a.date);

  return [...pinnedItems, ...unpinnedItems];
}
