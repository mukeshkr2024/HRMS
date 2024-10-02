import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api-client"

export const useGetMyTeamMembers = () => {
    return useQuery({
        queryKey: ["my-team-members"],
        queryFn: async () => {
            const { data } = await apiClient.get(`/feedbacks/members`);
            return data
        }
    })
}