
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetEmployeeShortInfo = (employeeId?: string) => {
    return useQuery({
        queryKey: ["employee", employeeId],
        queryFn: async () => {
            const endpoint = employeeId ? `/employees/short-info/?employee=${employeeId}` : `/employees/short-info`;
            const { data } = await apiClient.get(endpoint);
            return data
        },
        enabled: !!employeeId || !employeeId
    })
}
