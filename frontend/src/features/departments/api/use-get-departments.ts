import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api-client"

export const useGetDepartments = () => {
    return useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const { data } = await apiClient.get(`/departments`);
            return data;
        },
    });
}
