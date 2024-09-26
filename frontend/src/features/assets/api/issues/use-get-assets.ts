import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/api-client"

export const useGetAssetIssues = (employeeId?: string) => {
    return useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const endpoint = employeeId ? `/assets/issues?employee=${employeeId}` : `/assets/issues`;
            const { data } = await apiClient.get(endpoint);
            return data;
        },
    });
}
