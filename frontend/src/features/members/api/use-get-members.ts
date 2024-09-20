import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api-client"

export const useGetMembers = () => {
    return useQuery({
        queryKey: ["members"],
        queryFn: async () => {
            const { data } = await apiClient.get(`/members`);
            return data
        }
    })
}