import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const { data } = await apiClient.get("/tasks");
            return data
        }
    })
}