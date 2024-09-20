import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api-client"

export const useGetGoal = (goalId: string) => {
    return useQuery({
        queryKey: ["goal", goalId],
        queryFn: async () => {
            const { data } = await apiClient.get(`/employee/goals/${goalId}`);
            return data
        }
    })
}