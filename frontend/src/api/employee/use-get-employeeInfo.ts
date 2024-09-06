import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetEmployee = () => {
    return useQuery({
        queryKey: ["employee"],
        queryFn: async () => {
            const { data } = await apiClient.get(`/employees/info`);
            return data
        }
    })
}