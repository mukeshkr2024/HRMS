import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api-client"

export const useGetFeedbackNotifications = () => {
    return useQuery({
        queryKey: ["feedbacks-notifications"],
        queryFn: async () => {

            const { data } = await apiClient.get(`/notifications/feedbacks`);
            return data
        }
    })
}