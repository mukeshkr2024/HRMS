import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetDepartments = (folderId?: string) => {
    return useQuery({
        queryKey: ["departments", folderId],
        queryFn: async () => {
            const { data } = await apiClient.get(`/departments`);
            return data;
        },
    });
}
