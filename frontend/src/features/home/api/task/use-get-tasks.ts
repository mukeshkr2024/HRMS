import { apiClient } from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await apiClient.get("/tasks");
            return response.data;
        },

        staleTime: 5 * 60 * 1000,
    });
};
