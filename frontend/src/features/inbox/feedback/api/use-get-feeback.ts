import { apiClient } from "@/api-client";
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom";

export const useGetMemberFeedback = (id: string) => {
    const [seachParams] = useSearchParams()
    const notificationId = seachParams.get("notification_id")
    console.log(notificationId);

    return useQuery({
        queryKey: ["feedback", id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/feedbacks/${id}?notification_id=${notificationId}`);
            return data
        },
        enabled: !!id
    })
}