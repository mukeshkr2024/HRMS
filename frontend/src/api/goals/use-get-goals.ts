import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetGoals = (employeeId?: string) => {
    return useQuery({
        queryKey: ["goals"],
        queryFn: async () => {
            const endpoint = employeeId ? `/employee/goals/?employee=${employeeId}` : `/employee/goals`;
            const { data } = await apiClient.get(endpoint);
            return data
        },
        enabled: !!employeeId || !employeeId
    })
}