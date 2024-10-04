import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";

export const useGetAssessments = (memberId?: string) => {
    return useQuery({
        queryKey: ["assessments", memberId], // Include memberId in the queryKey for caching
        queryFn: async () => {
            // Conditionally include memberId in the query parameters
            const endpoint = memberId ? `/assessments?memberId=${memberId}` : `/assessments`;
            const { data } = await apiClient.get(endpoint);
            return data;
        },
    });
};
