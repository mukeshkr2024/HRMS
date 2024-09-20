import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";

export const useGetGoals = (employeeId?: string, status?: string) => {
    return useQuery({
        queryKey: ["goals", employeeId, status],
        queryFn: async () => {
            let endpoint = `/employee/goals`;

            const queryParams = [];

            if (employeeId) {
                queryParams.push(`employee=${employeeId}`);
            }

            if (status && status !== "all") {
                queryParams.push(`status=${status}`);
            }

            if (queryParams.length > 0) {
                endpoint += `?${queryParams.join('&')}`;
            }

            const { data } = await apiClient.get(endpoint);
            return data;
        },
        enabled: !!employeeId || !employeeId,
    });
};
