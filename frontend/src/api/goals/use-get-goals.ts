import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetGoals = () => {
    return useQuery({
        queryKey: ["goals"],
        queryFn: async () => {
            const { data } = await apiClient.get("/employee/goals");
            return data
        }
    })
}