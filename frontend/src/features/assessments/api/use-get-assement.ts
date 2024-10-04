import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api-client"

export const useGetAssessment = (id: string) => {
    return useQuery({
        queryKey: ["assessment", id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/assessments/${id}`);
            return data;
        },
        enabled: !!id
    });
}
