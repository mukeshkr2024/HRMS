import { apiClient } from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetAnnouncements = () => {
    return useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get("/announcements");
                return data;
            } catch (error) {
                throw new Error("Failed to fetch announcements");
            }
        },
        staleTime: 5 * 60 * 1000,
    });
};
