import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetAssets = (employeeId?: string) => {
    return useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const endpoint = employeeId ? `assets/?employee=${employeeId}` : `/assets`;
            const { data } = await apiClient.get(endpoint);
            return data;
        },
        enabled: !!employeeId || !employeeId
    });
}
