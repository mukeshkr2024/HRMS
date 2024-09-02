import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client";

export const useGetAnnouncements = () => {
    return useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const { data } = await apiClient.get("/announcements");
            return data;
        }
    })
}