import { useHistoryItemsQuery } from "hooks/useHistoryItems/queries";

export const useHistoryItems = () => {
  const { data } = useHistoryItemsQuery();
  const historyItems = data?.order ?? [];

  return { historyItems };
};
