import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api-client"

export const useGetGoal = (goalId: string, employee?: string) => {
    return useQuery({
        queryKey: ["goal", goalId],
        queryFn: async () => {
            const queryParams = new URLSearchParams();

            if (employee) {
                queryParams.append('employee', employee);
            }
            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
            const { data } = await apiClient.get(`/employee/goals/${goalId}/${queryString}`);
            return data
        }
    })
}