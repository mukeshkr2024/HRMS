import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";

export const useGetEmployee = (employeeId?: string) => {
    return useQuery({
        queryKey: ["employee", employeeId],
        queryFn: async () => {
            const endpoint = employeeId
                ? `/employees/info/?employee=${employeeId}`
                : `/employees/info`;
            const { data } = await apiClient.get(endpoint);
            return data;
        },
        enabled: !!employeeId || !employeeId,
    });
};
