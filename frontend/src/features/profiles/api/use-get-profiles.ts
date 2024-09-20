import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api-client"

export const useGetProfiles = () => {
    return useQuery({
        queryKey: ["profiles"],
        queryFn: async () => {
            const { data } = await apiClient.get(`/profiles`);
            return data;
        },
    });
}
