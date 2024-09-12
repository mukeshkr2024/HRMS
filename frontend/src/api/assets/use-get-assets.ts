import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetAssets = () => {
    return useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const { data } = await apiClient.get(`/assets`);
            return data;
        },
    });
}
