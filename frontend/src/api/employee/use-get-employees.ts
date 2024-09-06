import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetEmployees = () => {
    return useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const { data } = await apiClient.get(`/employees`);
            return data
        }
    })
}