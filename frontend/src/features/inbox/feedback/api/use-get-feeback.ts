import { apiClient } from "@/api-client";
import { useQuery } from "@tanstack/react-query"

export const useGetMemberFeedback = (id: string) => {
    return useQuery({
        queryKey: ["feedback", id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/feedbacks/${id}`);
            return data
        },
        enabled: !!id
    })
}