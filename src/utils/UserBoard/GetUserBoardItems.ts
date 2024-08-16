import { INoticeAllItem } from "@/types/PageBoardTypes";
import { ReadonlyURLSearchParams } from "next/navigation";

export function getUserBoardItems(api: string | INoticeAllItem[], params: ReadonlyURLSearchParams) {
  const queryParams = params.get("query");
  const categoryIdParams = params.get("categoryId");

  // api 연결 후 수정 필요
  const items = api as INoticeAllItem[];

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
    const authorLower = item.author.toLowerCase();
    const queryLower = queryParams.toLowerCase();

    switch (categoryId) {
      case 0:
        return (
          titleLower.includes(queryLower) ||
          contentLower.includes(queryLower) ||
          authorLower.includes(queryLower)
        );
      case 1:
        return titleLower.includes(queryLower);
      case 2:
        return contentLower.includes(queryLower);
      case 3:
        return authorLower.includes(queryLower);
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
