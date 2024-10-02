import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { DateRange } from "react-day-picker";

export const useGetMemberFeedbacks = (id: string, date: DateRange | undefined) => {
    return useInfiniteQuery({
        queryKey: ["member-feedbacks", id, date],
        queryFn: async ({ pageParam = 1 }) => {
            const queryParams = date && date.from && date.to
                ? `start=${date.from.toISOString()}&end=${date.to.toISOString()}&page=${pageParam}&limit=1`
                : `page=${pageParam}&limit=1`;
            const { data } = await apiClient.get(`/feedbacks/member/${id}?${queryParams}`);
            return data;
        },
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
        initialPageParam: 1,
    });
};
