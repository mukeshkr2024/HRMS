import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/api-client"

export const useGetAssetIssues = () => {
    return useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const { data } = await apiClient.get("/assets/issues");
            return data;
        },
    });
}
