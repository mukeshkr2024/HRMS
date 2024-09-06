import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetEmployeeOptions = () => {
    return useQuery({
        queryKey: ["employee-options"],
        queryFn: async () => {
            const { data } = await apiClient.get(`/employees/options`);
            return data
        }
    })
}